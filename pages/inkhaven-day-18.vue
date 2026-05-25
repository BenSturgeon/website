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
    const doc = await $content("inkhaven-day-18").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Which Information Sources I Listen to the Most",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "The four writers and thinkers who have shaped my frameworks recently: Arnaud Bertrand, Andrej Karpathy, Owain Evans, and Derek Sivers.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Which Information Sources I Listen to the Most",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "The four writers and thinkers who have shaped my frameworks recently: Arnaud Bertrand, Andrej Karpathy, Owain Evans, and Derek Sivers.",
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
