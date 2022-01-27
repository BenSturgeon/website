<template>
  <CommentForm/>
</template>

<script>
import { getDatabase, ref, set } from "firebase/database";
import CommentForm from '../components/CommentForm.vue';

export default {
  components: { CommentForm },
  name: "AppHeader",
  data: function () {
    return {
      testText: null,
      slug: String(this.$route.path).substring(1),
      readText: null
    };
  },
  methods: {

    async testDb() {
      try {
        const messageRef = this.$fire.database.ref("test/" + "1");

        await messageRef.set({
          phrase: this.testText,
        });
        console.log("worked!");
      } catch (e) {
        console.log(e);
      }
    },
    async readFromDb() {
      const messageRef = this.$fire.database.ref("test/" + "1");
      try {
        const snapshot = await messageRef.once('value')
        alert(snapshot.val().phrase);
      } catch (e) {
        alert(e);
        return;
      }
    },
  },
  // computed: {
  //   readText: function(){
      
  //   }
  // }
};
</script>

