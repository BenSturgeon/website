<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h1>About:</h1>
      <p>This is a page that has information about me.</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
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