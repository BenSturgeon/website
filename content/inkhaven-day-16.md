# You Can Just Build Things with Claude Code

*Day 16 of Inkhaven: 30 Days of Posts*

![Claude Code terminal](/cc_terminal.png)

Recently I've been building fun things with Claude Code. One thing that has been particularly exciting is that you can use Claude Code at the beginning and end of workflows to perform complex, judgement-laden tasks which are normally fuzzy and hard to verify, or which need a bunch of additional processing before they are useful.

But before we get to that, the most powerful part of building with Claude Code is to do all of the building inside Claude Code. Don't know how to spin up a virtual private server? Claude Code can guide you through it and do most of the hard stuff on your behalf. Don't know how to use git? All good, Claude is amazing at this. You simply don't need to learn all of the plumbing anymore. Even when navigating unfamiliar website interfaces or software I often just ask Claude how to do the thing, and it normally nails it. If it doesn't know because it's out of date, I send it screenshots and it normally works.

This is a crazy state of affairs. I often feel overwhelmed sitting at my laptop because of the godlike intelligence at my fingertips, eager to leap into action and build whatever I want.

Here are some things I've recently automated with Claude Code:

- **Automated meeting transcription pipeline.** I record calls in Google Meet or wherever, download them, and when I rename them to contain "meeting notes" they get converted to audio, transcribed by Claude Opus into beautiful notes with action items, and dumped into a folder in Obsidian. Recording meetings in person with Superwhisper is also a huge unlock.
- **Journal trajectory summaries.** A system that takes my daily journals, passes the most recent 10 entries to Claude Opus, and writes an overall trajectory summary integrating how things seem to generally be going. This gets appended to the end of the latest entry.
- **Beeminder accountability for Inkhaven.** A system that checks my website at 5PM each day to verify there's already a post up, and charges me money if not. (Still in progress.)
- **Daily briefing email.** A system that manages my entire Getting Things Done task list and sends me an automated email at 6AM with everything I need to do that day, plus reminders and messages that help keep me centred and balanced.

To give some additional detail about the last one and why I think it's cool. For context, everything here happens in a copy of my Obsidian vault which is kept in sync on a remote server, so diary entries, task inboxes, and project files are all available.

To stock the task inbox I use an input system where I send my Telegram bot a message or voice note, and it spins up a Claude Code agent which interprets the message in the context of the rest of my GTD task lists and adds it to my inbox. This is useful because it's an ultra-low-friction way to log tasks, and I can be confident that things will be raised to me at the correct time. This is genuinely relieving because worrying that I've let things slip through the cracks is a significant source of anxiety for me.

Each morning a job kicks off on my virtual private server, creates an instance of Claude Code, and gives it a massive prompt (written by Claude Code) containing instructions for what it needs to do. Claude Code spins up, reads my last 10 diary entries for context, looks at all my tasks and projects, and compiles an email with the key next actions, a selection of quotes I've chosen that I need to see as often as possible, and some cute ASCII art it comes up with on the day.

![Daily briefing email](/cc_briefing.png)

![Combined screenshots](/cc_combined.png)

This could all be done more easily with a Nanoclaw instance, but it was a useful exercise to build it with the simplest, cleanest setup possible, and to use actual Claude Code instances for powerful fuzzy-matching operations that can intelligently act without my input by leveraging the tons of context in my Obsidian library. While I'll probably port most of this over to Nanoclaw soon, I'm very excited about the potential of this flexible, intelligent endpoint that Claude Code enables, particularly as Anthropic add things like scheduled triggers which allow code to run on Anthropic's cloud-hosted infrastructure, connected to the necessary context via Google Drive or other solutions.

The power of the technology is already extraordinary, and the personal tools and automations one can create are immense. In one sense it would be great to productise things like this, but there is a huge amount of fun to be had in hacking together a suite of intelligent tools that increase your leverage hugely. Above all, speed matters. Make things work fast and then make them good. That's true of classic software engineering and of this new era of building.
