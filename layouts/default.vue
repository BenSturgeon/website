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
  

  
  ul .a:hover {
    color: rgb(0, 27, 27);
  }
  
  .content {
    width: 100%;
    background: white;
  
    height: 100%;
  }
  

  
  h2 {
    font-weight: 600;
    font-style: normal;
    font-family: "valkyrie_c4";
    font-weight: normal;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    line-height: 1em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    font-size: 1.6em;
  }
  

  body {
  
    color: black;
    line-height: 30px;
    /* padding: 5px; */
    max-width: 40em;
  }
  
  .nuxt-content h2, h1 {
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
  .nuxt-content h3 {
    font-weight: bold;
    font-size: 22px;
  }
  .nuxt-content p, ul {
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-family: "Georgia", serif;
    font-size: 20px;
  }

</style>
