<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-27").fetch();
    return { doc };
  },
  head() {
    return {
      title: "From Output to Connection",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "On orienting towards relationships with people rather than abstract impact or research output, and what shifts when you do.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "From Output to Connection",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "On orienting towards relationships with people rather than abstract impact or research output, and what shifts when you do.",
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
