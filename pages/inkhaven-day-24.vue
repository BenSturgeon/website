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
    const doc = await $content("inkhaven-day-24").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Do Emergently Misaligned Models Believe What They Say?",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Applying truth and deception probes to emergently misaligned models — the truth probe crosses from false to true on harmful content, suggesting genuine belief shift rather than role-play.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Do Emergently Misaligned Models Believe What They Say?",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Applying truth and deception probes to emergently misaligned models — the truth probe crosses from false to true on harmful content, suggesting genuine belief shift rather than role-play.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://www.benjaminsturgeon.com/06_truth_probe_per_category_with_prefill.png",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://www.benjaminsturgeon.com/06_truth_probe_per_category_with_prefill.png",
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
  color: var(--site-muted);
}
</style>
