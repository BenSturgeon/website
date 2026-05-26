<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center" align="center">
          <v-col d-flex flex-column justify-center align-center>
            <v-sheet>
              <AppHeader />
              <Nuxt />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "../components/AppHeader";
export default {
  name: "App",
  // computed:{
  //   theme(){
  //     return (this.$vuetify.theme.dark) ? 'dark' : 'light'
  //   }
  // },
  components: {
    AppHeader,
  },
};
</script>


<style>
:root {
  --site-bg: #0f1213;
  --site-panel: #15191a;
  --site-field: rgba(15, 18, 19, 0.82);
  --site-text: #e8e1e1;
  --site-title: #ffffff;
  --site-muted: rgb(116, 116, 116);
  --site-soft: rgb(200, 200, 200);
  --site-border: rgb(80, 80, 80);
  --site-overlay: rgba(0, 0, 0, 0.9);
  --site-success: rgb(154, 220, 178);
  --site-error: rgb(245, 150, 140);
  --site-disabled: #4c5557;
  --site-accent-rgb: 0 230 255;
  --site-accent: rgb(var(--site-accent-rgb) / 87%);
  --site-accent-soft: rgb(var(--site-accent-rgb) / 60%);
  --site-visited: #2b8fbf;
  --site-heading: #c2c7ca;
}

:root[data-theme="light"] {
  --site-bg: #d9d7d2;
  --site-panel: #e6e4df;
  --site-field: #e9e7e2;
  --site-text: #2a2826;
  --site-title: #161412;
  --site-muted: #6a665f;
  --site-soft: #413e39;
  --site-border: #b3afa7;
  --site-overlay: rgba(30, 28, 26, 0.55);
  --site-success: #2f6a44;
  --site-error: #9c3a21;
  --site-disabled: #9a958c;
  --site-accent-rgb: 194 87 28;
  --site-visited: #8a3f15;
  --site-heading: #8e2b24;
}

@font-face {
  font-family: "valkyrieC4";
  src: local("ValkyrieC4"),
    url(../fonts/ValkyrieC4/ValkyrieC4.ttf) format("truetype");
}

/* Smooth the light/dark switch instead of an instant snap */
*,
*::before,
*::after {
  transition: background-color 0.25s ease, border-color 0.25s ease,
    fill 0.25s ease;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition: none;
  }
}

a,
.link,
.v-application a,
.v-application .link {
  color: var(--site-accent);
  text-decoration: none;
}

a:visited,
.link:visited,
.v-application a:visited,
.v-application .link:visited {
  color: var(--site-visited) !important;
}

a:hover,
.link:hover,
.v-application a:hover,
.v-application .link:hover {
  color: var(--site-title) !important;
  text-decoration: underline;
}

p {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-family: "Georgia", serif;
  font-size: 20px;
  color: var(--site-text);
}

ul .a:hover {
  color: var(--site-title);
}

h2 {
  font-weight: 500;
  font-style: normal;
  font-family: "valkyrieC4";
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  line-height: 1.5em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  font-size: 30px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--site-heading);
}

.nuxt-content h2,
h4,
h1 {
  font-weight: 600;
  font-style: normal;
  font-family: "valkyrieC4";
  font-weight: normal;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  /* margin-top: 2em; */
  line-height: 1em;
  margin-block-start: 1em;
  margin-block-end: 1em;
}

.header {
  font-family: "valkyrieC4";
  font-weight: normal;
  font-size: 1.6em;
  margin-block-end: 1em;
}
.nuxt-content h1 {
  display: flex;
  margin: 3px;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  font-size: 2rem;
  font-family: valkyrieC4;
}

h3 {
  font-family: "valkyrieC4";
  font-weight: normal;

  font-size: 22px;
}
.nuxt-content img {
  max-width: 650px;
  width: 100%;
  height: auto;
}

.nuxt-content blockquote {
  border-left: 3px solid var(--site-accent-soft);
  padding: 0.25em 0 0.25em 1.25em;
  margin: 1.25em 0;
  max-width: 650px;
  color: var(--site-soft);
  font-style: italic;
}

.nuxt-content blockquote p {
  font-family: "Georgia", serif;
  font-size: 20px;
  margin: 0.5em 0;
}

.nuxt-content table {
  border-collapse: collapse;
  margin: 1.5em 0;
  max-width: 650px;
  width: 100%;
  font-family: "Georgia", serif;
  font-size: 17px;
  line-height: 1.4;
}

.nuxt-content table th {
  text-align: left;
  padding: 0.6em 0.8em;
  border-bottom: 2px solid var(--site-accent-soft);
  color: var(--site-accent);
  font-weight: 600;
  font-family: "valkyrieC4";
}

.nuxt-content table td {
  padding: 0.6em 0.8em;
  border-bottom: 1px solid var(--site-border);
  vertical-align: top;
}

.nuxt-content table tr:last-child td {
  border-bottom: none;
}


.nuxt-content p,
.nuxt-content ul,
.nuxt-content ol {
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-family: "Georgia", serif;
  font-size: 20px;
  text-overflow: ellipsis;
  max-width: 650px;
}

.nuxt-content li {
  font-family: "Georgia", serif;
}
body {
  max-width: 40em;
  margin: 0 auto;
  padding: 5px;
  border: 0ch;
  font-family: Georgia, sans-serif;
  font-size: 20px;
  line-height: 30px;
  color: var(--site-text);
}

.v-application {
  background-color: transparent !important;
  color: var(--site-text) !important;
}

.v-sheet {
  background-color: transparent !important;
  color: var(--site-text) !important;
}

html {
  background-color: var(--site-bg) !important;
  color: var(--site-text) !important;
  transition: background-color 0.25s ease;
}

html[data-theme="light"] body,
html[data-theme="light"] .v-application,
html[data-theme="light"] .v-main,
html[data-theme="light"] .v-sheet {
  background-color: transparent !important;
  color: var(--site-text) !important;
}
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: var(--site-overlay);
}

.modal-content {
  max-width: 90%; /* or whatever you prefer */
  max-height: 90%; /* or whatever you prefer */
}
</style>
