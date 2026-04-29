<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-28").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Attachment Theory Is Extremely Cool and Useful",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "An explainer and endorsement of attachment theory — what it actually is, common misconceptions, and why it has been useful for navigating relationships.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Attachment Theory Is Extremely Cool and Useful",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "An explainer and endorsement of attachment theory — what it actually is, common misconceptions, and why it has been useful for navigating relationships.",
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
