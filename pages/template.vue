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
    const doc = await $content(params.slug || "CHANGE ME TO THE NAME OF THE MARKDOWN FILE").fetch();
    
    return { doc };
  },
  head() {
    return {
      title: "CHANGE ME TO A SNAPPY TITLE",
      meta: [
        {
          hid: "CHANGE ME TO SLUG NAME",
          name: "CHANGE ME TO A LONGER NAME OF THE ARTICLE",
          content: "CHANGE ME TO A DESCRIPTION OF THE DOCUMENT FOR SEO",
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