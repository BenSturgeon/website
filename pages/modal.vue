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
    const doc = await $content("modal").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Modal made my research 2-5x faster",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Why I moved most of my compute to Modal: trivial parallelism, per-second billing, and a workflow that pairs perfectly with Claude Code.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Modal made my research 2-5x faster",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Why I moved most of my compute to Modal: trivial parallelism, per-second billing, and a workflow that pairs perfectly with Claude Code.",
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
  color: var(--site-muted);
}
</style>
