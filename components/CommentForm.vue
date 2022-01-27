<template>
  <v-container class="grey lighten-5">
    <h2 class="mt-1 mb-1 pa-4 ">
      Comments, questions, thoughts?<br />
      Share them down below:
    </h2>
    <v-form
      ref="form"
      v-model="form"
      class="pa-4 pt-6"
    >
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <h3>Your name:</h3>

        <v-text-field v-model="name" solo :rules="[rules.length(1)]" ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <h3>Your email:</h3>

        <v-text-field v-model="email" solo :rules="[rules.email]"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="8">
        <h3>Your words:</h3>
        <v-textarea
          class="text-wrap"
          :rules="[rules.length(5)]"
          filled
          height="150px"
          v-model="comment"
          solo
        ></v-textarea>
      </v-col>
    </v-row>
    </v-form>
    <v-row>
      <v-btn class="mx-8 " @click="writeUserData()" :disabled="!form"> submit </v-btn>
    </v-row>
    <!-- <v-row>
      <v-btn @click="readFromDb()"> I get what you wrote from the db! </v-btn>
    </v-row> -->
    <v-row>
      <p>{{ pageId }}</p>
    </v-row>
  </v-container>
</template>

<script>
import { getDatabase, ref, set, onValue } from "firebase/database";

export default {
  name: "AppHeader",
  data: function () {
    return {
      testText: null,
      slug: String(this.$route.path).substring(1),
      readText: null,
      name: null,
      email: null,
      comment: null,
      form: false,
      pageId: "test",
        rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      },
    };
  },
  created() {
    const db = getDatabase();
    const pageRef = ref(db, "pageRefs/" + this.slug);
    onValue(pageRef, (snapshot) => {
      console.log(snapshot.val());
      this.pageId = snapshot.val();
    });
  },
  methods: {
    writeUserData() {
      const db = getDatabase();
      var id = this.name + Math.random().toString(16).slice(2)
      console.log(id)
      // set(ref(db, "test/" + id), {
      //   username: this.name,
      //   email: this.email,
      //   comment: this.comment,
      // });
    },
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
      ref.on(
        "value",
        (snapshot) => {
          console.log(snapshot.val());
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.name);
        }
      );
      const messageRef = this.$fire.database.ref("test/" + "1");
      try {
        const snapshot = await messageRef.once("value");
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

<style scoped>
</style>