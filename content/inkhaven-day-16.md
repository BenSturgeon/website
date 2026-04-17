# You Can Just Build Things with Claude Code

*Day 16 of Inkhaven: 30 Days of Posts*

![Claude Code terminal](/cc_terminal.png)

Recently I've been building fun things with Claude Code. One thing that has been particularly exciting to me is that you can use Claude Code at the beginning and ends of workflows to perform complex, judgement laden tasks which are normally fuzzy and hard to verify, or which need to do a bunch of additional processing before they are useful.

But before we get to that, I think the most powerful and important part of building stuff with Claude Code, is to do all of the building inside Claude Code. Don't know how to spin up a virtual private server? Don't worry, Claude Code can guide you through this, and do most of the hard stuff on your behalf. Don't know how to use git to store your code etc? All good, Claude is amazing at this. Functionally, you simply don't need to learn all of the stuff to make this work anymore. Even when navigating website interfaces I haven't used before or trying to use software that's unfamiliar I often just ask Claude how to do that thing, and it normally nails it. If it doesn't know because it's out of date, I just send it screenshots and it normally works.

This is a crazy state of affairs. In fact I often feel overwhelmed when sitting at my laptop because of the godlike intelligence that is at my fingertips that is eager to leap into action and build whatever I want.

Here's an example of things I've recently automated with Claude Code that I think are cool:

- An automated meeting transcription pipeline
    - I just take recordings of calls in Google Meet or whatever, download them, and then when I rename them to contain the word "meeting notes" they get turned into audio, transcribed by the latest Claude Opus model into beautiful notes with great todos etc and dumped into a folder in Obsidian.
        - Recording meetings in person with Superwhisper is also a huge unlock.
- A system that takes my daily journals, and passes the most recent 10 entries to Claude Opus and writes an overall trajectory summary that integrates how things seem to generally be going and appends that to the end.
- A system that integrates into my Beeminder for ensuring I do what's necessary for my daily post for Inkhaven. This checks my website at 5PM and checks that there is already a post up for that day, and if not will charge me money. (Still in progress.)
- A system that manages my entire Getting Things Done todo list, and sends me an automated email at 6AM each day with all the stuff that I need to do that day, as well as important reminders and messages for myself that help keep me centred and balanced.

This latest task management system is one that I am particularly excited about. It is a two part system that uses Claude Code to take in and process tasks I send it via Telegram, and then an automated daily briefing email that is sent at 6AM which uses Claude Code to pull in tasks from my current projects and context from my other activities in order to make precise and coherent next actions.

![Combined screenshots](/cc_combined.png)

For context, all of this happens in a copy of my Obsidian vault which is kept in sync on my virtual private server, so all things like diary entries and task inboxes are available within the vault. Each morning a cron job kicks off, creating an instance of Claude Code with a massive pre-built prompt containing instructions for what it needs to do.

Claude Code will then spin up, go and look at my last 10 diary entries for context, look at all my tasks and projects, and compile an email that hits me with the key next tasks, a selection of quotes that I have selected which I need to see as often as possible, and some cute ASCII art it comes up with on the day.

![Daily briefing email](/cc_briefing.png)

This is valuable to me because it's an ultra low friction way to log tasks, and I can be confident that things will be surfaced to my attention later by the system. This is genuinely relieving to me because worrying that I have let things slip through the cracks is a significant source of anxiety for me.

This could all be done more easily with a Nanoclaw instance, but it was a useful exercise to build this with the simplest, cleanest setup possible, and to use actual Claude Code instances of powerful fuzzy matching operations that can intelligently do things without my input by leveraging the tons of context housed in my Obsidian library which I point it to. While in general I will probably port most of this over to Nanoclaw soon, I do feel very excited about the potential of this flexible, intelligent endpoint for data that Claude Code enables, particularly as Anthropic add things like scheduled triggers to Claude Code which allow for code to be run on Anthropic cloud hosted infrastructure, and which you can connect to the necessary context via Google Drive or other solutions.

The power of the technology is already extraordinary, and the personal tools and automations one can create are immense. In one sense it would be great to productise things like this, but on the other, there is a huge amount of fun to be had in hacking together a suite of intelligent tools that can increase my leverage hugely.
