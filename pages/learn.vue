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
    const doc = await $content(params.slug || "learning_how_to_learn").fetch();

    return { doc };
  },
  head() {
    return {
      title: "Learning How to Learn",
      meta: [
        {
        
          hid: "description",
          name: "description",
          content: "Notes on how to learn.",
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


/* h1 {
  font-weight: 400;
  font-style: normal;
  font-family: "valkyrie_c4";
  font-weight: normal;
  margin-block-end: 1em;
  font-size: 1.6em;
}

.header .title:hover {
  border-bottom: 3px solid #526488;
  margin-bottom: -3px;
} */
.timePosted{
  color: rgb(116, 116, 116);
}
</style>