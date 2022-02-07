<template>
  <div>
    <h2>Me in 11 seconds</h2>
    <p></p>
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

    <h2 class="font-weight-medium">Me in many seconds</h2>
    <p>link to my <nuxt-link to="/about" class="link">about</nuxt-link> page</p>
    <h2>Test func</h2>
    <p>link to my <nuxt-link to="/test" class="link">test</nuxt-link> page</p>

    <h2>Posts</h2>
    <p>
      <nuxt-link to="first" class="link"
        >Lessons from my first 10 day Vipassana</nuxt-link
      >
    </p>
    
        <p>
      <nuxt-link to="learn" class="link"
        >Learning how to learn</nuxt-link
      >
    </p>

    <!-- <li>
                <nuxt-link to='/about' class="page" >Posts</nuxt-link>
            </li>
            <li>
                <nuxt-link to='/about' class="page">Projects</nuxt-link>
            </li> -->
  </div>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

