<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-19").fetch();
    return { doc };
  },
  head() {
    return {
      title: "People That Inspire Me",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Six people whose approach to work and life has shaped my thinking — Chris Olah, Neel Nanda, Tim Ferriss, Anna Solomon, Masaaki Yuasa, and Eric Reinholdt — and the concept of shokunin that ties them together.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "People That Inspire Me",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Six people whose approach to work and life has shaped my thinking — Chris Olah, Neel Nanda, Tim Ferriss, Anna Solomon, Masaaki Yuasa, and Eric Reinholdt — and the concept of shokunin that ties them together.",
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
