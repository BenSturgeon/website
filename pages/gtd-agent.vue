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
  async asyncData({ $content, params }) {
    const doc = await $content(params.slug || "gtd-agent").fetch();

    return { doc };
  },
  head() {
    return {
      title: "Building an Automated GTD System with Claude Code and Telegram",
      meta: [
        {
          hid: "gtd-agent",
          name: "Building an Automated GTD System with Claude Code and Telegram",
          content:
            "A walkthrough of the system I built to capture tasks via Telegram voice notes and receive a curated daily briefing email — all powered by Claude Code agents running on a remote server.",
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
