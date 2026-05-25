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
    const doc = await $content("inkhaven-day-21").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Giving AI a Childhood",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Models are born into the world without the slow structure of a childhood — what would it mean to deliberately give them one?",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Giving AI a Childhood",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Models are born into the world without the slow structure of a childhood — what would it mean to deliberately give them one?",
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
