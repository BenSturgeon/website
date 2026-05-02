<template>
  <article>
    <p class="timePosted">{{ formatDate(doc.updatedAt) }}</p>
    <nuxt-content :document="doc" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const doc = await $content("inkhaven-day-30").fetch();
    return { doc };
  },
  head() {
    return {
      title: "Linkpost: Sanity-Checking 'Incompressible Knowledge Probes'",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Linkpost to a LessWrong writeup with LawrenceC examining a paper that claimed to reverse-engineer frontier model parameter counts from a knowledge benchmark — and the methodological flaws that inflate its estimates by up to 10x.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Linkpost: Sanity-Checking 'Incompressible Knowledge Probes'",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Linkpost to a LessWrong writeup with LawrenceC examining a paper that claimed to reverse-engineer frontier model parameter counts from a knowledge benchmark — and the methodological flaws that inflate its estimates by up to 10x.",
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
