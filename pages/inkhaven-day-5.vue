<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-5").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Spectator Sport",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Watching a cybersecurity competition where the most promising minds have become spectators to their own tools.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Spectator Sport",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Watching a cybersecurity competition where the most promising minds have become spectators to their own tools.",
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
