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
    const doc = await $content("inkhaven-day-3").fetch();
    return { doc };
  },
  head() {
    return {
      title: "The Garden (Part 1)",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Two angels tasked with building paradise discover that creation demands uncomfortable trade-offs.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "The Garden (Part 1)",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Two angels tasked with building paradise discover that creation demands uncomfortable trade-offs.",
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
