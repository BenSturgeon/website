<template>
  <header class="siteHeader">
    <nuxt-link to="/" class="header">Benjamin Sturgeon</nuxt-link>
    <v-btn
      class="themeToggle"
      icon
      :aria-label="themeLabel"
      :title="themeLabel"
      @click="toggleTheme"
    >
      <v-icon>{{ themeIcon }}</v-icon>
    </v-btn>
  </header>
</template>
<script>
export default {
  name: "AppHeader",
  data() {
    return {
      themeMode: "dark",
    };
  },
  computed: {
    themeIcon() {
      return this.themeMode === "dark"
        ? "mdi-white-balance-sunny"
        : "mdi-weather-night";
    },
    themeLabel() {
      return this.themeMode === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode";
    },
  },
  mounted() {
    this.syncTheme();
    window.addEventListener("site-theme-change", this.syncTheme);
  },
  beforeDestroy() {
    window.removeEventListener("site-theme-change", this.syncTheme);
  },
  methods: {
    syncTheme() {
      this.themeMode =
        document.documentElement.dataset.theme ||
        (window.siteTheme && window.siteTheme.getMode()) ||
        "dark";
    },
    toggleTheme() {
      if (window.siteTheme) {
        window.siteTheme.toggleMode();
      }
    },
  },
};
</script>

<style scoped>
.siteHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.header {
  display: flex;
  margin: 3px;
  align-items: center;
  /* margin-bottom: 1rem; */
  padding-bottom: 0.5rem;
  font-size: 3rem;
  font-family: valkyrieC4 !important;
  color: var(--site-title);
}

.themeToggle {
  color: var(--site-muted) !important;
  flex: 0 0 auto;
}

.themeToggle:hover {
  color: var(--site-accent) !important;
}

@media (max-width: 600px) {
  .header {
    font-size: 2.2rem;
  }
}
</style>
