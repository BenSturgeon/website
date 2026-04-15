<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-13").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Characterising the Views on Safety from Frontier AI Labs: Anthropic and DeepMind",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Considering the characters of AI lab leaders and what their communications reveal about their approaches to safety.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Characterising the Views on Safety from Frontier AI Labs",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Considering the characters of AI lab leaders and what their communications reveal about their approaches to safety.",
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
