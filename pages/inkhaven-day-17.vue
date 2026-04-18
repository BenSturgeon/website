<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-17").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Do Models Know They're Lying When Claiming Fake Identities?",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Probing how Qwen3-32B internally registers false identity claims, and why the signal looks more like familiarity than deception.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Do Models Know They're Lying When Claiming Fake Identities?",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Probing how Qwen3-32B internally registers false identity claims, and why the signal looks more like familiarity than deception.",
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
