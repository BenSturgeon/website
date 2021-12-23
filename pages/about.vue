<template>
  <!-- <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
    </v-col>
  </v-row> -->
  <article>
    <p>Posted: {{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
    <pre> {{ doc }} </pre>
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const doc = await $content(params.slug || "index").fetch();

    return { doc };
  },
  head() {
    return {
      title: "About me",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Information about Benjamin",
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
 }
};
</script>

<style scoped>
/* .header .title {
  font-size: 2.9rem;
  color: #526488;
  font-family: 'Roboto Slab', serif;
} */

h1 {
  font-weight: 400;
  font-style: normal;
  font-family: "valkyrie_c4";
  font-weight: normal;
  /* margin-block-start: 1em; */
  margin-block-end: 1em;
  font-size: 1.6em;
}

.header .title:hover {
  border-bottom: 3px solid #526488;
  margin-bottom: -3px;
}
</style>