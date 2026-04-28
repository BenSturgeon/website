<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-12").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Is the Adult in the Room with Us Right Now?",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "On Anthropic's transparency with Mythos, what the zero-day results actually show, and what happens when open source catches up.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Is the Adult in the Room with Us Right Now?",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "On Anthropic's transparency with Mythos, what the zero-day results actually show, and what happens when open source catches up.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://www.benjaminsturgeon.com/swe_bench_pro.png",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://www.benjaminsturgeon.com/swe_bench_pro.png",
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
