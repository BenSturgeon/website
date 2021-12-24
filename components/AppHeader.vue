<template>
  <v-row justify="center" align="center">
    <v-col  sm="8" md="8" lg="10">
      <header>
        <nuxt-link to="/" class="header">Benjamin Sturgeon</nuxt-link>
      </header>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
.header {
  display: flex;
  margin: 3px;
  align-items: center;
  /* margin-bottom: 1rem; */
  padding-bottom: 0.5rem;
  font-size: 3rem;
  color: black;
  font-family: "Roboto Slab", serif;
}
</style>