<template>
  <div>
    <h1>Writing</h1>
    <p class="subtitle">
      Essays, research notes, and stories — including the
      <nuxt-link to="/inkhaven" class="link">Inkhaven</nuxt-link> 30-day run.
    </p>

    <div class="post-list">
      <div class="post-entry" v-for="post in posts" :key="post.link">
        <p class="post-date">
          {{ post.date }}<span v-if="post.day" class="tag">Inkhaven</span>
        </p>
        <a
          v-if="post.external"
          :href="post.link"
          target="_blank"
          rel="noopener noreferrer"
          class="link post-title"
          >{{ post.title }}</a
        >
        <nuxt-link v-else :to="post.link" class="link post-title">{{
          post.title
        }}</nuxt-link>
        <p v-if="post.description" class="post-description">
          {{ post.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { allPosts } from "~/data/posts.js";

export default {
  data() {
    return {
      posts: allPosts,
    };
  },
  head() {
    return {
      title: "Writing",
    };
  },
};
</script>

<style scoped>
.subtitle {
  color: var(--site-soft);
  margin-bottom: 2rem;
}

.post-list {
  margin-top: 1rem;
}

.post-entry {
  margin-bottom: 2rem;
}

.post-date {
  color: rgb(116, 116, 116);
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.tag {
  margin-left: 0.6rem;
  padding: 0.05rem 0.4rem;
  border: 1px solid rgb(80, 80, 80);
  border-radius: 4px;
  font-size: 0.75rem;
  color: rgb(140, 140, 140);
}

.post-title {
  font-size: 1.4rem;
  font-family: "valkyrieC4";
  color: var(--site-accent);
}

.post-description {
  color: rgb(180, 180, 180);
  margin-top: 0.25rem;
  font-size: 0.95rem;
}
</style>
