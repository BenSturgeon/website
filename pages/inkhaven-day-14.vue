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
    const doc = await $content("inkhaven-day-14").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Characterising the Views on Safety from Frontier AI Labs: OpenAI",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "How OpenAI's political dynamics hollowed out its safety mission, and what the talent exodus to Anthropic tells us about where things are headed.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Characterising the Views on Safety from Frontier AI Labs: OpenAI",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "How OpenAI's political dynamics hollowed out its safety mission, and what the talent exodus to Anthropic tells us about where things are headed.",
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
  color: var(--site-muted);
}
</style>
