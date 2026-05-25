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
  --site-accent-rgb: 0 230 255;
  --site-accent: rgb(var(--site-accent-rgb) / 87%);
  --site-accent-soft: rgb(var(--site-accent-rgb) / 60%);
}

:root[data-accent="green"] {
  --site-accent-rgb: 70 220 150;
}

:root[data-theme="light"] {
  --site-bg: #f7f6f1;
  --site-panel: #ffffff;
  --site-field: rgba(255, 255, 255, 0.9);
  --site-text: #222524;
  --site-title: #111615;
  --site-muted: #666d69;
  --site-soft: #3b4240;
  --site-border: #d7d2c8;
  --site-overlay: rgba(255, 255, 255, 0.92);
}

@font-face {
  font-family: "valkyrieC4";
  src: local("ValkyrieC4"),
    url(../fonts/ValkyrieC4/ValkyrieC4.ttf) format("truetype");
}

a {
  text-decoration: none;
}
a:hover {
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
  color: rgb(0, 27, 27);
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
  color: var(--site-accent);
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
  background-color: var(--site-bg);
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
  background-color: var(--site-bg);
  color: var(--site-text);
}

.v-application {
  background-color: var(--site-bg) !important;
}

.v-sheet,
html {
  background-color: var(--site-bg) !important;
  color: var(--site-text) !important;
  transition: background-color 0.2s ease, color 0.2s ease;
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
