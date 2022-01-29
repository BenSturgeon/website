<template>
  <v-container class="grey lighten-5" md="10" lg="11">
    <h2 class="mt-1 mb-1 pa-4">
      Comments, questions, thoughts?<br />
      Share them below:
    </h2>
    <v-form ref="form" v-model="form" class="pa-1">
      <v-row>
        <v-col cols="12" xs="3" class="form_container">
          <h3>Your name:</h3>

          <v-text-field
            class="form"
            width="100px"
            v-model="name"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="3" sm="6" md="6" lg="6"
         class="form_container">
          <h3>Your email:</h3>

          <v-text-field
            class="form"
            v-model="email"
            solo
            :rules="[rules.email]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="10">
          <h3 class="mt-0">Your words:</h3>
          <v-textarea
            class="text-wrap"
            filled
            height="150px"
            v-model="comment"
            solo
          ></v-textarea>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-btn class="ma-4 mt-0" @click="writeUserData()" :disabled="!form">
        submit
      </v-btn>
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
      var today = new Date(); 
      var date = today.getFullYear()+'-'+ (today.getMonth()+1)+'-'+ today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      set(ref(db, this.pageId + "/" + id), {
        name: this.name,
        email: this.email,
        comment: this.comment,
        dateTime: dateTime
      });
      this.$refs.form.reset()
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
.form{
  max-width: 240px;
  margin-top: 4px;
  margin-bottom: 1px;
  padding-bottom: 1px;
}
.form_container{
  margin-top: 1px;
  margin-bottom: 1px;
  padding-bottom: 1px;
  padding-top: 1px;
}
</style>