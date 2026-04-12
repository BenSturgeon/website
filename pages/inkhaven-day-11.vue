<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-11").fetch();
    return { doc };
  },
  head() {
    return {
      title: "South African Infrastructure Part 2: How to Make a Problem Disappear",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "How municipalities use Eskom electricity to cover budget shortfalls, and why the death spiral may be unfixable.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content:
            "South African Infrastructure Part 2: How to Make a Problem Disappear",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "How municipalities use Eskom electricity to cover budget shortfalls, and why the death spiral may be unfixable.",
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
  },
};
</script>

<style scoped>
.timePosted {
  color: rgb(116, 116, 116);
}
</style>
