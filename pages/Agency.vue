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
    const doc = await $content(params.slug || "Agency take").fetch();

    return { doc };
  },
  head() {
    return {
      title: "Why pursue understanding agency in AI safety",
      meta: [
        {
          hid: "Agencytake",
          name: "An article talking about the benefits of trying to conceive of alignment as an agency problem.",
          content:
            "I discuss the perspective of AI safety being an issue  of an agency contest between humans and AGI and how this view provides insight.",
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