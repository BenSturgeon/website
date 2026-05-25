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
    const doc = await $content("inkhaven-day-15").fetch();
    return { doc };
  },
  head() {
    return {
      title: "A Case for Persona Robustness as a Research Area",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "How harmful behaviours can emerge from long-horizon RL training and why persona robustness matters for alignment.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "A Case for Persona Robustness as a Research Area",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "How harmful behaviours can emerge from long-horizon RL training and why persona robustness matters for alignment.",
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
