<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-10").fetch();
    return { doc };
  },
  head() {
    return {
      title: "How South Africa's Electricity Catastrophe Was (Mostly) Fixed",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "How private solar deployment ended South Africa's rolling blackouts in three years, and why Eskom couldn't do it.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content:
            "How South Africa's Electricity Catastrophe Was (Mostly) Fixed",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "How private solar deployment ended South Africa's rolling blackouts in three years, and why Eskom couldn't do it.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://www.benjaminsturgeon.com/loadshedding_final2.png",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://www.benjaminsturgeon.com/loadshedding_final2.png",
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
