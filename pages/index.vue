<template>
  <div>
    <h2>Me in 10 seconds</h2>
    <p></p>
    <p>
      I am a
      <a href="https://github.com/BenSturgeon/">programmer</a>, and philosopher.
    </p>

    <p>
      AI safety researcher residing in Cape Town. My main aim in life is to make
      a positive impact by helping to align powerful AI systems. Currently
      pursuing an Mphil in Applied Mathematics at the University of Cape Town.
    </p>
    <p>
      I am deeply inspired by Stoicism, effective altruism, and the teachings of
      the Buddha. Pretty into meditation.
    </p>

    <h2 class="font-weight-medium">Me in many seconds</h2>
    <p>link to my <nuxt-link to="/about" class="link">about</nuxt-link> page</p>
    <!-- <h2>Test func</h2>
    <p>link to my <nuxt-link to="/test" class="link">test</nuxt-link> page</p> -->

    <h2 class="font-weight-medium">Now Now Now</h2>
    <p>
      What I'm doing <nuxt-link to="/nownownow" class="link">now</nuxt-link>
    </p>

    <h2>Posts</h2>
    <p>
      <nuxt-link to="first" class="link"
        >Lessons from my first 10 day Vipassana</nuxt-link
      >
    </p>

    <p>
      <nuxt-link to="learn" class="link">Learning how to learn</nuxt-link>
    </p>
    <p>
      <nuxt-link to="Agency" class="link"
        >Why pursue conceptions of agency for AI safety</nuxt-link
      >
    </p>

    <p>
      <a
        href="https://www.lesswrong.com/posts/SFHiWyNfWQAtvMBx2/vipassana-meditation-and-active-inference-a-framework-for-understanding-suffering-and-its-cessation"
      >
        Vipassana Meditation and Active Inference: A Framework for Understanding
        Suffering and its Cessation
      </a>
    </p>

    <h2>Projects</h2>
    <p>
      <nuxt-link to="word2vec" class="link">
        Building and training a word embedding system
      </nuxt-link>
    </p>
    <p>
      <nuxt-link to="minigpt" class="link"
        >Creating a small GPT from scratch in Pytorch
      </nuxt-link>
    </p>

    <p>
      <nuxt-link to="arcitechnologies_first" class="link">
        Adding vision and navigation to an autonomous farm robot
      </nuxt-link>
    </p>
    <p>
      <a
        href="https://github.com/BenSturgeon/ai-safety-camp-2024-model-agents/tree/main/src"
      >
        Developing toy models of agency. A mechanistic interpretability
        project.</a
      >
    </p>

    <h2>Talks</h2>
    <p>
      <a href="https://youtu.be/UdWziLLKsWU"> An intro to AI Safety </a>
    </p>

    <h2>Papers</h2>
    <p>
      <a
        href="https://drive.google.com/file/d/18WRi_JkB0n3op77usTL_CGXxW0eUfiph/view?usp=drive_link"
        >Investigating Factored Cognition in Large Language Models For Answering
        Ethically Nuanced Questions</a
      >
    </p>
    <p>
      <a
        href="https://drive.google.com/file/d/1wrXeUoi3qYw-AG5CyB2a6aVWxb_ZvuYO/view?usp=sharing"
      >
        A Security Analysis of the Linux RNG Protocol in Virtual Machines</a
      >
    </p>

    <h2>Pictures</h2>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="(image, index) in images"
        :key="index"
      >
        <v-img
          :src="image"
          class="mx-auto"
          aspect-ratio="1.5"
          @click="openModal(image)"
        ></v-img>
      </v-col>
    </v-row>
    <div v-if="modalImage" class="modal" @click="closeModal">
      <img :src="modalImage" class="modal-content" />
    </div>

    <h2>My Resumé</h2>
    <p>
      <a
        href="https://drive.google.com/file/d/1Xy6G_x73E2cfW_2QRnVkt5BH1fA0-XvT/view?usp=sharing"
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
  name: 'AppHeader',
  data() {
    return {
      images: [
        require('@/assets/images/Ben pic.jpeg'),
        require('@/assets/images/IMG_0241_final.jpeg'),
        require('@/assets/images/IMG-20230208-WA0006.jpeg'),
      ],
      modalImage: null,
    }
  },
  methods: {
    openModal(image) {
      this.modalImage = image
    },
    closeModal() {
      this.modalImage = null
    },
  },
}
</script>
