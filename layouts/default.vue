<template>
<v-app>
  
    <v-main>
          
      <v-container>
      <AppHeader />
        
        <Nuxt />
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
  
  body {
  
    color: black;
    line-height: 30px;
    /* padding: 5px; */
  }
  
</style>
