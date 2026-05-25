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
        {
          hid: "og:image",
          property: "og:image",
          content: "https://www.benjaminsturgeon.com/anglo_youth_life_eval.png",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://www.benjaminsturgeon.com/anglo_youth_life_eval.png",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
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
