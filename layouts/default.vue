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
  color: #e8e1e1;
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
  color: rgb(0 230 255 / 87%);
}

.nuxt-content h2,
h4,
h1 {
  font-weight: 600;
  font-style: normal;
  font-family: "valkyrie_c4";
  font-weight: normal;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  /* margin-top: 2em; */
  line-height: 1em;
  margin-block-start: 1em;
  margin-block-end: 1em;
}

.header {
  font-family: "valkyrie_c4";
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
  font-family: "valkyrie_c4";
  font-weight: normal;

  font-size: 22px;
}
.nuxt-content p,
ul {
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-family: "Georgia", serif;
  font-size: 20px;
  text-overflow: ellipsis;
  max-width: 650px;
  background-color: #0f1213;
}
body {
  max-width: 40em;
  margin: 0 auto;
  padding: 5px;
  border: 0ch;
  font-family: Georgia, sans-serif;
  font-size: 20px;
  line-height: 30px;
  background-color: #0f1213;
}

.v-application {
  background-color: #0f1213 !important;
}

.v-sheet,
html {
  background-color: #0f1213 !important;
  color: #f7fafb !important;
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
  background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
  max-width: 90%; /* or whatever you prefer */
  max-height: 90%; /* or whatever you prefer */
}
</style>

