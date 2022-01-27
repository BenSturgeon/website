<template>
  <v-container class="grey lighten-5">
    <h2>
      Comments, questions, thoughts?<br />
      Share them down below:
    </h2>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <h3>Your name:</h3>

        <v-text-field
          v-model="testText"
          label="Solo"
          placeholder="Placeholder"
          solo
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <h3>Your email:</h3>

        <v-text-field
          v-model="testText"
          label="Solo"
          placeholder="Placeholder"
          solo
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <h3>Your words:</h3>

        <v-text-field
          v-model="testText"
          label="Solo"
          placeholder="Placeholder"
          solo
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-btn @click="testDb()"> submit </v-btn>
    </v-row>
    <v-row>
      <v-btn @click="readFromDb()"> I get what you wrote from the db! </v-btn>
    </v-row>
    <v-row>
      <p>asdasd{{ pageId }}</p>
    </v-row>
  </v-container>
</template>

<script>
import { getDatabase, ref, set , onValue} from "firebase/database";

export default {
  name: "AppHeader",
  data: function () {
    return {
      testText: null,
      slug: String(this.$route.path).substring(1),
      readText: null,
      pageId: "test"
    };
  },
  created(){
      const db = getDatabase();
      const pageRef = ref(db, "pageRefs/" + this.slug);
      onValue(pageRef, (snapshot) => {
        console.log(snapshot.val())
        this.pageId = snapshot.val()
      })
  },
  methods: {
    writeUserData(name, email, comment) {
      const db = getDatabase();
      set(ref(db, "test/" + name), {
        username: name,
        email: email,
        comment: comment,
      });
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