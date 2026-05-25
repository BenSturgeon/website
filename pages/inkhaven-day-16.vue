<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
    <CommentSection />
    <CommentForm />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-16").fetch();
    return { doc };
  },
  head() {
    return {
      title: "You Can Just Build Things with Claude Code",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Building personal automations with Claude Code — from meeting transcription to daily briefing emails.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "You Can Just Build Things with Claude Code",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Building personal automations with Claude Code — from meeting transcription to daily briefing emails.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://www.benjaminsturgeon.com/cc_terminal.png",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://www.benjaminsturgeon.com/cc_terminal.png",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
  },
};
</script>

<style scoped>
.timePosted {
  color: rgb(116, 116, 116);
}
</style>
