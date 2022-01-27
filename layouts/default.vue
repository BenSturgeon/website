<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6" lg="5">
            <AppHeader />

            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "../components/AppHeader";
export default {
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
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-family: "Georgia", serif;
  font-size: 20px;
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

.nuxt-content h2, h4,
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
}
</style>
