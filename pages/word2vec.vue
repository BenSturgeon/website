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
    const doc = await $content(params.slug || "explore_word2vec").fetch();
    
    return { doc };
  },
  head() {
    return {
      title: "Building a word2vec model",
      meta: [
        {
          hid: "word2vec",
          name: "A code exploration of building a word2vec model",
          content: "This is a project where I build a word2vec model from scratch to get a better understanding of vector embeddings.",
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-GB', options)
    }
 }
};
</script>

<style scoped>
.timePosted{
  color: rgb(116, 116, 116);
}
</style>