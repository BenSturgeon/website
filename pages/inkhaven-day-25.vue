<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-25").fetch();
    return { doc };
  },
  head() {
    return {
      title: "The Great Smoothing Out",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "On Yuri the shrine maiden, the Culture's homogeneity, China's language laws, and Will MacAskill's saturation view as a frame for what's lost when cultures get smoothed out.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "The Great Smoothing Out",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "On Yuri the shrine maiden, the Culture's homogeneity, China's language laws, and Will MacAskill's saturation view as a frame for what's lost when cultures get smoothed out.",
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
