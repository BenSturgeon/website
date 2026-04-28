<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-22").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Whatever I Was Doing in 2020, I Should Do Again",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "A data-driven analysis of 567 journal entries over six years, and what stands out about 2020 as a particularly alive period.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Whatever I Was Doing in 2020, I Should Do Again",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "A data-driven analysis of 567 journal entries over six years, and what stands out about 2020 as a particularly alive period.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://www.benjaminsturgeon.com/journal_scores_chart.png",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://www.benjaminsturgeon.com/journal_scores_chart.png",
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
