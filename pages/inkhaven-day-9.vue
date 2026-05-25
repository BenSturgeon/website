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
    const doc = await $content("inkhaven-day-9").fetch();
    return { doc };
  },
  head() {
    return {
      title: "This Is Not Financial Advice",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "On bitcoin mistakes, Palantir ethics, and investing in compute infrastructure while working on AI safety.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "This Is Not Financial Advice",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "On bitcoin mistakes, Palantir ethics, and investing in compute infrastructure while working on AI safety.",
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
