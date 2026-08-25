# Building an Automated GTD System with Claude Code and Telegram

**Meta:** This post was written by Claude Code, with the full context of the [open-source repo](https://github.com/BenSturgeon/gtd-agent) and our design conversations. I've edited it for accuracy and voice. The system itself was also built primarily by talking to Claude Code across a few long interactive sessions — most of the scripts, prompts, and architecture came out of that collaboration. The repo is the result; this post is the reasoning.

Code: [**BenSturgeon/gtd-agent**](https://github.com/BenSturgeon/gtd-agent) · MIT licensed.

---

A walkthrough of the system I built to capture tasks via Telegram voice notes and receive a curated daily briefing email — all powered by Claude Code agents running on a remote server.

## The problem

I was already using markdown files for GTD (Storage.md, Inbox.md, Dashboard.md) and it was working, but three things bothered me:

1. **No curation.** My daily note pulled ALL `#next` items. That's not "what should I do today" — it's "everything I could possibly do."
2. **No feedback loop.** I completed tasks and wrote journal reflections, but nothing read those and adjusted priorities.
3. **Capture friction.** Adding a task meant opening the app, navigating to a file, typing. Too many steps for a passing thought.

The system fixes all three — voice capture goes straight to the inbox via Telegram, a capture agent cleans up messy dumps into structured tasks immediately, and a morning briefing agent reads everything (including my journals for emotional context) to pick 5–7 things I should actually do that day.

## Architecture

```
YOUR PHONE
    │
    ▼  Telegram voice note / text
REMOTE SERVER
    │
    ├─ capture_listener (always-on, long-polling)
    │     Detects message → transcribe → Claude Code processes
    │     → updates task files → Telegram confirms
    │
    ├─ daily_briefing (cron, 6am)
    │     Reads vault + journals + goals → curated email
    │
    └─ watchdog (cron, hourly)
          Restarts dead listener, retries stuck pipelines
```

See the full architecture diagram in the [repo README](https://github.com/BenSturgeon/gtd-agent/blob/main/README.md).

## The interesting bits

### Two agents, not one

A naive version would have a single Claude Code agent run on a schedule and do everything. That burns cost on every message and makes the agent's job too wide. Instead:

- The [capture agent prompt](https://github.com/BenSturgeon/gtd-agent/blob/main/prompts/capture_agent_prompt.txt) is narrow — it only handles incoming messages. Parses a messy voice dump, maps references to existing tasks (the user will say "the CG thing" and it has to figure out what that means), updates Storage.md, and sends a Telegram confirmation.
- The [morning briefing prompt](https://github.com/BenSturgeon/gtd-agent/blob/main/prompts/agent_prompt.txt) is wide — runs once daily, reads everything, composes a long-form email, selects 5–7 next actions.

They share the same GTD rulebook: [`gtd_reference.md`](https://github.com/BenSturgeon/gtd-agent/blob/main/prompts/gtd_reference.md).

### The GTD reference is the most important file

My first briefing run tagged **14 different things as `#next`**. It felt productive. It was paralyzing.

The fix was writing [`gtd_reference.md`](https://github.com/BenSturgeon/gtd-agent/blob/main/prompts/gtd_reference.md) — a strict, researched version of David Allen's framework with explicit anti-patterns. Critical rules:

- A next action is the *next physical, visible activity*. "Investigate X" is **wrong** — that's a project. The next action is the first concrete step.
- Each project gets exactly **one** `#next` action. When you finish it, you define the next one.
- 5–7 next actions per day in the briefing. Not more. Less is better.

Without these rules explicit and repeated, Claude will happily promote every sub-task to a next action. Output quality lives or dies on this file.

### Capture is real intelligence, not text cleanup

Early on I thought the capture agent's job was "clean up the transcription and drop it in Inbox.md." But voice notes aren't shopping lists — they're a mix of status updates, new tasks, priority shifts, goal-setting, and thinking-out-loud.

A single voice note might say:

> "Yeah so the CG thing is done. Submit-HAB is someday-maybe now, not this week. And uhh I want to focus this week on Inkhaven, specifically finishing the archive page. Also quarterly goal is getting accepted to CLR."

The [capture agent](https://github.com/BenSturgeon/gtd-agent/blob/main/prompts/capture_agent_prompt.txt) parses all of that, checks off the CG task, reclassifies the HAB task, writes this week's goals to the weekly note, writes the quarterly goal to the quarter note, and sends a Telegram confirmation. It's a full GTD review delivered via voice note.

### Transcription is a minefield

I tried six different models. Results on a test voice note:

| Model | Output |
|-------|--------|
| `gemini-3-flash-preview` | Generated a confident fictional paragraph about caves. Total hallucination. |
| `whisper-1` | "Thank you." (refused to transcribe properly) |
| `gpt-4o-mini-transcribe` | "Yes." |
| `gemini-2.5-flash` | "Hello, I'm sending another voice note from in 2026." (missed location) |
| `gemini-2.5-pro` | "Hello, I'm sending another voice note from New Haven in 2026." (wrong location) |
| `gemini-3.1-pro-preview` (wav) | "Hello, I'm sending another voice note from Ink Haven in 2026." ✓ |

Gemini 3.1 Pro with an ffmpeg `ogg→wav` conversion was the only one that consistently worked. Others hallucinate badly on Telegram's ogg/opus format. The model + conversion live in [`telegram_capture.py`](https://github.com/BenSturgeon/gtd-agent/blob/main/scripts/telegram_capture.py).

### The listener uses long-polling, not a webhook or a cron

The [capture listener](https://github.com/BenSturgeon/gtd-agent/blob/main/scripts/capture_listener.py) hits Telegram's `getUpdates` with a 120s timeout and blocks. When a message arrives, it fires the pipeline immediately. No webhook server needed, no cron jitter. One always-on Python process.

### The briefing email: HTML + ASCII art

The morning email is styled HTML — system fonts, muted palette, editorial typography. No emoji, no gradients, no "CLICK HERE" buttons. It feels like a personal letter, not a dashboard. See the [HTML design principles in the prompt](https://github.com/BenSturgeon/gtd-agent/blob/main/prompts/agent_prompt.txt).

Each briefing also contains a small piece of ASCII art the agent generates by free-associating from whatever it notices that day — the weather of my inner world, the shape of today's tasks, a metaphor for a theme it's picking up. It's a small gift, not a summary, different every time.

### Self-healing

When the listener dies (which it will), the [watchdog](https://github.com/BenSturgeon/gtd-agent/blob/main/scripts/watchdog.py) notices within an hour and restarts it silently. When a pipeline gets stuck (failed subprocess, permissions drift), it retries. Only if recovery fails does it ping me on Telegram — with a pointer to the [debug runbook](https://github.com/BenSturgeon/gtd-agent/blob/main/prompts/debug_runbook.md).

The runbook is written for a future agent to read too — so when something breaks, I (or Claude) can diagnose from first principles without replaying the whole conversation.

## Picking a VPS

For this kind of always-on automated LLM workload — a tiny persistent process that polls an API, runs a CLI agent every so often, needs a stable IP and a real filesystem — I've been happy with [Hetzner](https://www.hetzner.com/cloud). A CX22 instance runs ~€4/month and has more than enough for this. DigitalOcean, Linode, and Fly.io all work too. Skip anything serverless (Lambda, Cloud Run) — you want a long-lived process for the capture listener, not pay-per-request.

## Costs

- VPS: ~€4/month for a small Hetzner instance (no GPU needed)
- Claude Code: ~$5/month on API-key billing for this workload (or free on a Pro/Max subscription, with occasional re-auths)
- OpenRouter: pennies per voice note
- Gmail SMTP: free
- Obsidian Sync (how I keep files synced with my phone): $4/month. The system is [sync-agnostic](https://github.com/BenSturgeon/gtd-agent/blob/main/.env.example) — git, Syncthing, or no sync work equally well.

## Gotchas I hit

- Claude Code refuses `--dangerously-skip-permissions` as root. Non-root user or `su` into one.
- Don't put anything persistent in `/tmp/`. Some hosts wipe it on reboot.
- The listener started with `nohup` doesn't survive a host reboot. Use systemd or accept that the watchdog restarts it next hour.
- Telegram's ogg/opus format confuses most audio models. Convert to wav first.

## Try it

All of this lives at [github.com/BenSturgeon/gtd-agent](https://github.com/BenSturgeon/gtd-agent) with a full [setup guide](https://github.com/BenSturgeon/gtd-agent/blob/main/setup.md). MIT licensed.
