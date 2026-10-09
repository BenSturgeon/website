<template>
  <div>
    <h2>Me in 10 seconds</h2>

    <p>
      I'm currently an Astra fellow where I'm working with the Technical AI
      Safety Grantmaking team at
      <a
        href="https://coefficientgiving.org/funds/global-catastrophic-risks-opportunities/"
        target="_blank"
        rel="noopener noreferrer"
        >Coefficient Giving</a
      >
      where I'm helping out with
      <a
        href="https://coefficientgiving.org/tailwind/get-involved/"
        target="_blank"
        rel="noopener noreferrer"
        >Tailwind</a
      >
      and making grants.
    </p>

    <p>
      Before that I did the MATS extension where I worked on personas and
      understanding how model beliefs change when different methods are used to
      implant a given persona which resulted in
      <a
        href="https://arxiv.org/abs/2606.11502"
        target="_blank"
        rel="noopener noreferrer"
        >this paper</a
      >. I'm trying to make grants focused on alignment research and trying to
      get a deep understanding into the nature of language models so if you are
      aware of promising work in this area please reach out to me or put me in
      touch with the right people.
    </p>

    <p>
      I'm also a director at the
      <a href="https://cisai.co/" target="_blank" rel="noopener noreferrer"
        >Cape Institute for Safe AI</a
      >
      which I also co-founded. This is an org primarily focused on growing the
      AI safety community in South Africa and Africa more broadly.
    </p>

    <p>
      I welcome feedback on how I'm doing! If you'd like to share, please feel
      encouraged to do so using this
      <a
        href="https://forms.gle/v3S3dGb9kY3xdc389"
        target="_blank"
        rel="noopener noreferrer"
        >feedback form</a
      >.
    </p>

    <h2 class="font-weight-medium">Me in many seconds</h2>
    <p>link to my <nuxt-link to="/about" class="link">about</nuxt-link> page</p>
    <!-- <h2>Test func</h2>
    <p>link to my <nuxt-link to="/test" class="link">test</nuxt-link> page</p> -->

    <h2 class="font-weight-medium">Now Now Now</h2>
    <p>
      What I'm doing <nuxt-link to="/nownownow" class="link">now</nuxt-link>
    </p>

    <h2 class="font-weight-medium">Writing</h2>
    <div class="featured-list">
      <p v-for="post in featured" :key="post.link" class="featured-entry">
        <a
          v-if="post.external"
          :href="post.link"
          target="_blank"
          rel="noopener noreferrer"
          class="link"
          >{{ post.title }}</a
        >
        <nuxt-link v-else :to="post.link" class="link">{{
          post.title
        }}</nuxt-link>
      </p>
    </div>
    <p>
      <nuxt-link to="/writing" class="link">All writing</nuxt-link>
    </p>

    <h2>Projects</h2>
    <p>
      <nuxt-link to="/inkhaven" class="link"
        >Inkhaven: 30 Days of Posts</nuxt-link
      >
    </p>
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
      <a href="https://arxiv.org/abs/2606.11502"
        >When Roleplaying, Do Models Believe What They Say?</a
      >
    </p>
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
    <p>
      <a
        href="https://drive.google.com/file/d/1uewIN57VyaBjWFwPlSEUExc7IIUEhppp/view?usp=drive_link"
        >HumanAgencyBench: Do Language Models Support Human Agency?</a
      >
    </p>
    <h2>Pictures</h2>
    <v-row>
      <v-col
        cols="10"
        sm="10"
        md="8"
        offset-md="0"
        v-for="(image, index) in images"
        :key="index"
      >
        <v-img
          :src="image"
          class="mb-4"
          aspect-ratio="1.8"
          @click="openModal(image)"
          align="left"
        ></v-img>
      </v-col>
    </v-row>
    <div v-if="modalImage" class="modal" @click="closeModal">
      <img :src="modalImage" class="modal-content" />
    </div>

    <h2>My Resumé</h2>
    <p>
      <a
        href="https://drive.google.com/uc?export=download&id=1jwMmr6mH5s3CuyPdbI-k-YnT1BZWuCGn "
      >
        Download my resumé
      </a>
    </p>
    <h2 class="connect-heading">Connect</h2>
    <div class="social-links">
      <a href="mailto:bwm.sturgeon@gmail.com" aria-label="Email">
        <v-icon large color="white">mdi-email</v-icon>
      </a>
      <a
        href="https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=kPfAAe0AAAAJ"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Google Scholar"
      >
        <v-icon large color="white">mdi-school</v-icon>
      </a>
      <a
        href="https://github.com/bensturgeon/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <v-icon large color="white">mdi-github</v-icon>
      </a>
      <a
        href="https://www.linkedin.com/in/benjamin-sturgeon-41221241/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <v-icon large color="white">mdi-linkedin</v-icon>
      </a>
    </div>

    <div style="height: 200px"></div>
  </div>
</template>

<script>
import { featuredPosts } from '~/data/posts.js'

export default {
  name: 'AppHeader',
  data() {
    return {
      featured: featuredPosts,
      images: [
        require('@/assets/images/webp/Ben_pic.webp'),
        require('@/assets/images/webp/IMG_0241_final.webp'),
        require('@/assets/images/webp/IMG-20230208-WA0006.webp'),
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

<style scoped>
.social-links {
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
}

.social-links a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.social-links a:hover {
  color: var(--site-accent);
}

.social-links ::v-deep .v-icon {
  color: var(--site-title) !important;
}

.social-links a:hover ::v-deep .v-icon {
  color: var(--site-accent) !important;
}
</style>
