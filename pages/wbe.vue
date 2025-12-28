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
    const doc = await $content(params.slug || "wbe").fetch();

    return { doc };
  },
  head() {
    return {
      title: "Whole Brain Emulation as an Anchor for AI Welfare",
      meta: [
        {
          hid: "wbe",
          name: "Whole Brain Emulation as an Anchor for AI Welfare",
          content:
            "Using WBEs as an anchor point to make empirical progress on AI welfare without solving consciousness.",
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
