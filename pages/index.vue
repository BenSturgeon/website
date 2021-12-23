<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
  <div>
    <h2>Me in 10 seconds</h2>
    <p>
    </p>
    <p>
      I am a programmer, writer, machine learning engineer and AI enthusiast.
    </p>

    <p>
      My role is to find interesting and important ideas and distribute them to
      others in a way that adds value.
    </p>
    <p>
      I want to help people by removing tedious or superfluous activities from
      their lives so they have more time for awareness and contemplation.
    </p>
    <p>Currently living in Cape Town South Africa.</p>
    

    <h2>Me in many seconds</h2>
    <p>link to my <nuxt-link to="/about" class="link">about</nuxt-link> page</p>
    <h2>Test func</h2>
    <p>link to my <nuxt-link to="/test" class="link">test</nuxt-link> page</p>
    
    
    <!-- <li>
                <nuxt-link to='/about' class="page" >Posts</nuxt-link>
            </li>
            <li>
                <nuxt-link to='/about' class="page">Projects</nuxt-link>
            </li> -->
  </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>


<style scoped>

</style>