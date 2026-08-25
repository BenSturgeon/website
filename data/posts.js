// Single source of truth for all writing on the site.
//
// `inkhavenPosts`  – the 30-day Inkhaven challenge (also rendered standalone on /inkhaven).
// `otherPosts`     – posts that predate / sit outside Inkhaven.
// `allPosts`       – the two merged and sorted newest-first (powers /writing).
// `featuredSlugs`  – hand-picked links shown on the front page; edit this to recurate.

export const inkhavenPosts = [
  {
    day: 1,
    iso: "2026-04-01",
    date: "1 April 2026",
    title: "How did the United States hand over its future to corporations?",
    description:
      "Tracing how a single memo by a corporate lawyer led to the systematic dismantling of the policies that built America's middle class.",
    link: "/inkhaven-day-1",
  },
  {
    day: 2,
    iso: "2026-04-02",
    date: "2 April 2026",
    title: "The Physics of Great Storytelling",
    description:
      "How the best fiction earns its weight by letting the world do the work — using Hunter X Hunter and A Wise Man's Fear as examples.",
    link: "/inkhaven-day-2",
  },
  {
    day: 3,
    iso: "2026-04-03",
    date: "3 April 2026",
    title: "The Garden (Part 1)",
    description:
      "Two angels tasked with building paradise discover that creation demands uncomfortable trade-offs.",
    link: "/inkhaven-day-3",
  },
  {
    day: 4,
    iso: "2026-04-04",
    date: "4 April 2026",
    title: "The Garden (Complete)",
    description:
      "Two angels debate whether paradise requires suffering. One builds elegant systems; the other asks why they can't do better.",
    link: "/inkhaven-day-4",
  },
  {
    day: 5,
    iso: "2026-04-05",
    date: "5 April 2026",
    title: "Spectator Sport",
    description:
      "Watching a cybersecurity competition where the most promising minds have become spectators to their own tools.",
    link: "/inkhaven-day-5",
  },
  {
    day: 6,
    iso: "2026-04-06",
    date: "6 April 2026",
    title: "How Does an Agent with Multiple Goals Choose a Target?",
    description:
      "How a maze-solving RL agent internally represents and switches between multiple sequential goals, discovering spatial gating through negative activations.",
    link: "/maze-agent",
  },
  {
    day: 7,
    iso: "2026-04-07",
    date: "7 April 2026",
    title: "Spend Money to Buy Opportunity",
    link: "/inkhaven-day-7",
  },
  {
    day: 8,
    iso: "2026-04-07",
    date: "7 April 2026",
    title:
      "Revisiting GSM-Symbolic: Do 2026 Frontier Models Still Fail at Confounded Grade School Math?",
    link: "/inkhaven-day-8",
  },
  {
    day: 9,
    iso: "2026-04-09",
    date: "9 April 2026",
    title: "This Is Not Financial Advice",
    link: "/inkhaven-day-9",
  },
  {
    day: 10,
    iso: "2026-04-10",
    date: "10 April 2026",
    title: "How South Africa's Electricity Catastrophe Was (Mostly) Fixed",
    link: "/inkhaven-day-10",
  },
  {
    day: 11,
    iso: "2026-04-11",
    date: "11 April 2026",
    title: "How to Make a Problem Disappear",
    link: "/inkhaven-day-11",
  },
  {
    day: 12,
    iso: "2026-04-12",
    date: "12 April 2026",
    title: "Is the Adult in the Room with Us Right Now?",
    link: "/inkhaven-day-12",
  },
  {
    day: 13,
    iso: "2026-04-13",
    date: "13 April 2026",
    title:
      "Characterising the Views on Safety from Frontier AI Labs: Anthropic and DeepMind",
    link: "/inkhaven-day-13",
  },
  {
    day: 14,
    iso: "2026-04-14",
    date: "14 April 2026",
    title:
      "Characterising the Views on Safety from Frontier AI Labs: OpenAI",
    link: "/inkhaven-day-14",
  },
  {
    day: 15,
    iso: "2026-04-15",
    date: "15 April 2026",
    title: "A Case for Persona Robustness as a Research Area",
    link: "/inkhaven-day-15",
  },
  {
    day: 16,
    iso: "2026-04-16",
    date: "16 April 2026",
    title: "You Can Just Build Things with Claude Code",
    link: "/inkhaven-day-16",
  },
  {
    day: 17,
    iso: "2026-04-17",
    date: "17 April 2026",
    title: "Do Models Know They're Lying When Claiming Fake Identities?",
    link: "/inkhaven-day-17",
  },
  {
    day: 18,
    iso: "2026-04-18",
    date: "18 April 2026",
    title: "Which Information Sources I Listen to the Most",
    link: "/inkhaven-day-18",
  },
  {
    day: 19,
    iso: "2026-04-19",
    date: "19 April 2026",
    title: "People That Inspire Me",
    link: "/inkhaven-day-19",
  },
  {
    day: 20,
    iso: "2026-04-20",
    date: "20 April 2026",
    title: "Contributing to Technical Research in the AI Safety End Game",
    link: "/inkhaven-day-20",
  },
  {
    day: 21,
    iso: "2026-04-21",
    date: "21 April 2026",
    title: "Giving AI a Childhood",
    link: "/inkhaven-day-21",
  },
  {
    day: 22,
    iso: "2026-04-22",
    date: "22 April 2026",
    title: "Whatever I Was Doing in 2020, I Should Do Again",
    link: "/inkhaven-day-22",
  },
  {
    day: 23,
    iso: "2026-04-23",
    date: "23 April 2026",
    title: "Whatever I Was Doing in 2020, I Should Do Again (Continued)",
    link: "/inkhaven-day-23",
  },
  {
    day: 24,
    iso: "2026-04-24",
    date: "24 April 2026",
    title: "Do Emergently Misaligned Models Believe What They Say?",
    link: "/inkhaven-day-24",
  },
  {
    day: 25,
    iso: "2026-04-25",
    date: "25 April 2026",
    title: "The Great Smoothing Out",
    link: "/inkhaven-day-25",
  },
  {
    day: 26,
    iso: "2026-04-26",
    date: "26 April 2026",
    title:
      "Why Are Anglophone Countries Unhappier Than Their European Counterparts?",
    link: "/inkhaven-day-26",
  },
  {
    day: 27,
    iso: "2026-04-27",
    date: "27 April 2026",
    title: "From Output to Connection",
    link: "/inkhaven-day-27",
  },
  {
    day: 28,
    iso: "2026-04-28",
    date: "28 April 2026",
    title: "Attachment Theory Is Extremely Cool and Useful",
    link: "/inkhaven-day-28",
  },
  {
    day: 29,
    iso: "2026-04-29",
    date: "29 April 2026",
    title: "Q&A",
    link: "/inkhaven-day-29",
  },
  {
    day: 30,
    iso: "2026-05-01",
    date: "1 May 2026",
    title: "Linkpost: Sanity-Checking 'Incompressible Knowledge Probes'",
    link: "/inkhaven-day-30",
  },
];

export const otherPosts = [
  {
    iso: "2026-04-19",
    date: "April 2026",
    title: "Building an Automated GTD System with Claude Code and Telegram",
    link: "/gtd-agent",
  },
  {
    iso: "2026-06-16",
    date: "June 2026",
    title: "Modal made my research 2-5x faster",
    link: "/modal",
  },
  {
    iso: "2025-12-28",
    date: "December 2025",
    title: "Whole Brain Emulation as an Anchor for AI Welfare",
    link: "/wbe",
  },
  {
    iso: "2023-11-12",
    date: "November 2023",
    title: "Why pursue conceptions of agency for AI safety",
    link: "/Agency",
  },
  {
    iso: "2023-01-01",
    date: "2023",
    title:
      "Vipassana Meditation and Active Inference: A Framework for Understanding Suffering and its Cessation",
    link:
      "https://www.lesswrong.com/posts/SFHiWyNfWQAtvMBx2/vipassana-meditation-and-active-inference-a-framework-for-understanding-suffering-and-its-cessation",
    external: true,
  },
  {
    iso: "2022-01-30",
    date: "January 2022",
    title: "Lessons from my first 10 day Vipassana",
    link: "/first",
  },
];

// Newest first; same-day ties fall back to Inkhaven day number.
export const allPosts = [...inkhavenPosts, ...otherPosts].sort((a, b) =>
  b.iso === a.iso ? (b.day || 0) - (a.day || 0) : b.iso.localeCompare(a.iso)
);

// Front-page selection. Reorder / swap these links to recurate the home page.
export const featuredSlugs = [
  "/inkhaven-day-15", // A Case for Persona Robustness as a Research Area
  "/inkhaven-day-20", // Contributing to Technical Research in the AI Safety End Game
  "/first", // Lessons from my first 10 day Vipassana
  "/inkhaven-day-17", // Do Models Know They're Lying When Claiming Fake Identities?
  "/wbe", // Whole Brain Emulation as an Anchor for AI Welfare
  "/inkhaven-day-10", // How South Africa's Electricity Catastrophe Was (Mostly) Fixed
  "/inkhaven-day-8", // Revisiting GSM-Symbolic
  "/inkhaven-day-4", // The Garden (Complete)
];

export const featuredPosts = featuredSlugs
  .map((slug) => allPosts.find((p) => p.link === slug))
  .filter(Boolean);
