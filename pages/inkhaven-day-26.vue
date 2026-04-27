<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-26").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Why Are Anglophone Countries Unhappier Than Their European Counterparts?",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Youth happiness has collapsed across the six major English-speaking countries since 2010, while it's stayed flat or risen elsewhere. Quebec gives a clean natural experiment for why.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Why Are Anglophone Countries Unhappier Than Their European Counterparts?",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Youth happiness has collapsed across the six major English-speaking countries since 2010, while it's stayed flat or risen elsewhere. Quebec gives a clean natural experiment for why.",
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
