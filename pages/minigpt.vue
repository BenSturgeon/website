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
    const doc = await $content(params.slug || "mini_gpt").fetch();

    return { doc };
  },
  head() {
    return {
      title: "Building a small GPT from scratch in Pytorch",
      meta: [
        {
          hid: "minigpt",
          name: "A code exploration of building a generative pretrained transformer model",
          content:
            "This is a project where I build a GPT model from scratch to get a better understanding of transformer models..",
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