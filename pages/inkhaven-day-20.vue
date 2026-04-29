<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-20").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Is It Still Possible to Contribute to Technical AI Safety Research from Outside the Labs?",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "What the Claude Mythos system card reveals about which safety techniques actually ship, and why that should reshape how researchers think about impact.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Is It Still Possible to Contribute to Technical AI Safety Research from Outside the Labs?",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "What the Claude Mythos system card reveals about which safety techniques actually ship, and why that should reshape how researchers think about impact.",
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
