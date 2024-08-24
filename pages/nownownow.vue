<template>
  <article>
    <h1>{{ doc.title }}</h1>
    <p class="timePosted">{{ formatDate(this.doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
    <CommentSection />
    <CommentForm />
  </article>
</template>
  
<script>
export default {
  async asyncData({ $content, params }) {
    try {
      const doc = await $content(params.slug || 'now').fetch()
      return { doc }
    } catch (e) {
      console.error('Error fetching content:', e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return {
      title: this.doc.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.doc.description,
        },
      ],
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      if (isNaN(d.getTime())) return date // Return original string if invalid
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return d.toLocaleDateString('en-GB', options)
    },
  },
}
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
.timePosted {
  color: rgb(116, 116, 116);
}
</style>