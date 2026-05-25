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
    const doc = await $content("inkhaven-day-4").fetch();
    return { doc };
  },
  head() {
    return {
      title: "The Garden (Complete)",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Two angels debate whether paradise requires suffering. One builds elegant systems; the other asks why they can't do better.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "The Garden (Complete)",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Two angels debate whether paradise requires suffering. One builds elegant systems; the other asks why they can't do better.",
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
