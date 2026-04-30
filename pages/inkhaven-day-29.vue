<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-29").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Q&A",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Eight questions about priorities, comforts, structure, and motivation — and my honest answers.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Q&A",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Eight questions about priorities, comforts, structure, and motivation — and my honest answers.",
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
