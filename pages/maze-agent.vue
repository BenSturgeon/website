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
    const doc = await $content("maze-agent").fetch();
    return { doc };
  },
  head() {
    return {
      title: "How Does an Agent with Multiple Goals Choose a Target?",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "We investigated how a maze-solving RL agent internally represents and switches between multiple sequential goals, discovering spatial gating through negative activations.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content:
            "How Does an Agent with Multiple Goals Choose a Target?",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "We investigated how a maze-solving RL agent internally represents and switches between multiple sequential goals, discovering spatial gating through negative activations.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://www.benjaminsturgeon.com/thesis_figures/disinhibition_paper_figure_v2.png",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://www.benjaminsturgeon.com/thesis_figures/disinhibition_paper_figure_v2.png",
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
