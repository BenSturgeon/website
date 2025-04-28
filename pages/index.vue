<template>
  <div>
    <h2>Me in 10 seconds</h2>

    <p>
      I'm a researcher working at the intersection of AI safety and machine
      learning, with a focus on understanding and evaluating AI systems.
      Currently pursuing an MPhil in Applied Mathematics at the University of
      Cape Town, where I study mechanistic interpretability of deep learning
      models.
    </p>

    <p>
      My work combines technical ML research with philosophical inquiry into
      questions of AI alignment and safety. Recent projects include developing
      benchmarks for evaluating language models and investigating goal
      representations in reinforcement learning systems.
    </p>

    <p>
      Outside of research, I draw inspiration from Buddhist philosophy,
      Stoicism, and effective altruism in thinking about how to make meaningful
      contributions to the field of AI safety.
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
        href="https://drive.google.com/uc?export=download&id=1njfKpOSkZMdGax20bjNyePBlysDyBC1P"
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
export default {
  name: 'AppHeader',
  data() {
    return {
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
  color: #e4e2e2;
}
</style>