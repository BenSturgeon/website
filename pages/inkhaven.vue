<template>
  <div>
    <h1>Inkhaven: 30 Days of Posts</h1>
    <p class="subtitle">
      A 30-day writing challenge at Lighthaven, exploring AI safety, politics,
      and positive futures.
    </p>

    <div class="post-list">
      <div class="post-entry" v-for="post in posts" :key="post.day">
        <p class="post-date">{{ post.date }}</p>
        <nuxt-link :to="post.link" class="link post-title">{{
          post.title
        }}</nuxt-link>
        <p class="post-description">{{ post.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          day: 2,
          date: "2 April 2026",
          title: "The Physics of Great Storytelling",
          description:
            "How the best fiction earns its weight by letting the world do the work — using Hunter X Hunter and A Wise Man's Fear as examples.",
          link: "/inkhaven-day-2",
        },
        {
          day: 1,
          date: "1 April 2026",
          title:
            "How did the United States hand over its future to corporations?",
          description:
            "Tracing how a single memo by a corporate lawyer led to the systematic dismantling of the policies that built America's middle class.",
          link: "/inkhaven-day-1",
        },
      ],
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
  color: rgb(160, 160, 160);
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

.post-title {
  font-size: 1.2rem;
}

.post-description {
  color: rgb(180, 180, 180);
  margin-top: 0.25rem;
  font-size: 0.95rem;
}
</style>
