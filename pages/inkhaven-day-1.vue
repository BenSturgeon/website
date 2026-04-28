<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-1").fetch();
    return { doc };
  },
  head() {
    return {
      title: "How did the United States hand over its future to corporations?",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Tracing how a single memo by a corporate lawyer led to the systematic dismantling of the policies that built America's middle class.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content:
            "How did the United States hand over its future to corporations?",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Tracing how a single memo by a corporate lawyer led to the systematic dismantling of the policies that built America's middle class.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://www.benjaminsturgeon.com/inkhaven-day-1-img-1.png",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://www.benjaminsturgeon.com/inkhaven-day-1-img-1.png",
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
