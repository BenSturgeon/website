<template>
 
    <header >
      <nuxt-link to="/" class="header">Benjamin Sturgeon</nuxt-link>
    </header>

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
  font-family: valkyrieC4;
}
</style>