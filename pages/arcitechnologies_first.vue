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
  async asyncData({ $content, params }) {
    const doc = await $content(params.slug || "arcitechnologies_first").fetch();

    return { doc };
  },
  head() {
    return {
      title: "Arcitechnologies case study",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "A semi technical case study of some of my work with Cape AI for Arcitechnologies",
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      var cat = null;
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