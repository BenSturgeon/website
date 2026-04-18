<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("gtd-agent").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Building an Automated GTD System with Claude Code and Telegram",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "A walkthrough of my GTD automation: Telegram voice capture, curated daily briefing emails, and Claude Code agents running on a VPS.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Building an Automated GTD System with Claude Code and Telegram",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "A walkthrough of my GTD automation: Telegram voice capture, curated daily briefing emails, and Claude Code agents running on a VPS.",
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
