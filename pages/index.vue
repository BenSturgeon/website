<template>
  <div>
    <h2>Me in 10 seconds</h2>
    <p></p>
    <p>
      I am a
      <a href="https://github.com/BenSturgeon/">programmer</a>, and philosopher.
    </p>

    <p>
      I am a 27-year-old South African residing in Cape Town. My main aim in
      life is to make a positive impact by helping to align powerful AI systems.
    </p>
    <p>
      I am deeply inspired by Stoicism, effective altruism, and the teachings of
      the Buddha.
    </p>
    <p>I also meditate like it's my part time job.</p>

    <h2 class="font-weight-medium">Me in many seconds</h2>
    <p>link to my <nuxt-link to="/about" class="link">about</nuxt-link> page</p>
    <!-- <h2>Test func</h2>
    <p>link to my <nuxt-link to="/test" class="link">test</nuxt-link> page</p> -->

    <h2>Posts</h2>
    <p>
      <nuxt-link to="first" class="link"
        >Lessons from my first 10 day Vipassana</nuxt-link
      >
    </p>

    <p>
      <nuxt-link to="learn" class="link">Learning how to learn</nuxt-link>
    </p>

    <h2>Projects</h2>
    <p>
      <nuxt-link to="word2vec" class="link">
        Building and training a word embedding system
      </nuxt-link>
    </p>

    <p>
      <nuxt-link to="arcitechnologies_first" class="link"
        >Adding self-navigation to an automated farm robot
      </nuxt-link>
    </p>

    <h2>My Resumé</h2>
    <p>
      <a
        href="https://drive.google.com/uc?export=download&id=1s7UxkojnVKwGw5-eqOzrvfwOG_7qq1qN"
      >
        Download my resumé
      </a>
    </p>
    <!-- <h2>Evidence of my humanity</h2>
    <p>
      <a href="https://www.instagram.com/bensturgeon/">Instagram</a>
    </p> -->

    <div style="height: 200px"></div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

