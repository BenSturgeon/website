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
    const doc = await $content("inkhaven-day-7").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Spend Money to Buy Opportunity",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "The bottleneck for most people isn't talent or work ethic. It's visibility.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Spend Money to Buy Opportunity",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "The bottleneck for most people isn't talent or work ethic. It's visibility.",
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
