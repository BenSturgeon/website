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
    const doc = await $content("inkhaven-day-8").fetch();
    return { doc };
  },
  head() {
    return {
      title:
        "Revisiting GSM-Symbolic: Do 2026 Frontier Models Still Fail at Confounded Grade School Math?",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Replicating the GSM-Symbolic results with 2026 models shows the original failures only appear with ambiguous samples.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content:
            "Revisiting GSM-Symbolic: Do 2026 Frontier Models Still Fail at Confounded Grade School Math?",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Replicating the GSM-Symbolic results with 2026 models shows the original failures only appear with ambiguous samples.",
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
