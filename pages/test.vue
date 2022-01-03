<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Solo"
          placeholder="Placeholder"
          solo
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          v-model="testText"
          label="Solo"
          placeholder="Placeholder"
          solo
        ></v-text-field>
        <p>Message is: {{ testText }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-btn @click="testDb('testwords')"> press me, I test things! </v-btn>
    </v-row>
        <v-row>
      <v-btn @click="testDb('testwords')"> I get what you wrote from the db! </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { getDatabase, ref, set } from "firebase/database";

export default {
  name: "AppHeader",
  data: function () {
    return {
      testText: null,
      slug: String(this.$route.path).substring(1)
    };
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
      const messageRef = this.$fire.database.ref("test/" + "1");
      try {
        const snapshot = await messageRef.once('value')
        alert(snapshot.val().message);
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

