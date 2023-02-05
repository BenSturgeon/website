<template>
  <div>
    <h2>Me in 10 seconds</h2>
    <p></p>
    <p>
      I am a
      <a href="https://github.com/BenSturgeon/Odom_parser">programmer</a>,
      writer, machine learning engineer and AI enthusiast.
    </p>

      <p>I am a 26-year-old South African residing in Cape Town, fueled by my passions for philosophy, AI, personal growth, reading, writing, and spiritual advancement. My main aim in life is to make a difference in the world of AI and contribute to solving the alignment problem, which is why I have pursued a career in machine learning. </p>
    <p>I am deeply inspired by Stoicism, effective altruism, Taoism, and the teachings of the Buddha. 
    <p>The spiritual aspect of my life has undergone a huge shift for me in the last few years and has helped me to develop a truer understanding of the world, and I plan to continue my journey in this area in the future.</p></p>

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
        Building a word2vec model
      </nuxt-link>
    </p>

    <p>
      <nuxt-link to="arcitechnologies_first" class="link"
        >Building a semantic segmentation model with Arcitechnologies
      </nuxt-link>
    </p>

    <h2>My Resumé</h2>
    <p>
      <a href="https://drive.google.com/uc?export=download&id=1s7UxkojnVKwGw5-eqOzrvfwOG_7qq1qN"> 
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

