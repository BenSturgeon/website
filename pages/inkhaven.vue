<template>
  <div>
    <h1>Inkhaven: 30 Days of Posts</h1>
    <p class="subtitle">
      A 30-day writing challenge at Lighthaven, exploring AI safety, politics,
      and positive futures.
    </p>

    <div class="post-list">
      <div class="post-entry" v-for="post in posts" :key="post.day">
        <p class="post-date">Day {{ post.day }} · {{ post.date }}</p>
        <nuxt-link :to="post.link" class="link post-title">{{
          post.title
        }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { inkhavenPosts } from "~/data/posts.js";

export default {
  data() {
    return {
      posts: inkhavenPosts,
    };
  },
  head() {
    return {
      title: "Inkhaven: 30 Days of Posts",
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
  color: var(--site-muted);
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.post-title {
  font-size: 1.4rem;
  font-family: "valkyrieC4";
  color: var(--site-accent);
}

.post-description {
  color: var(--site-soft);
  margin-top: 0.25rem;
  font-size: 0.95rem;
}
</style>
