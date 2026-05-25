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
    const doc = await $content("inkhaven-day-2").fetch();
    return { doc };
  },
  head() {
    return {
      title: "The Physics of Great Storytelling",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "How the best fiction earns its weight by letting the world do the work — using Hunter X Hunter and A Wise Man's Fear as examples.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "The Physics of Great Storytelling",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "How the best fiction earns its weight by letting the world do the work — using Hunter X Hunter and A Wise Man's Fear as examples.",
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
  color: var(--site-muted);
}
</style>
