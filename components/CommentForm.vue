<template>
  <v-container class="formBackground" md="10" lg="11">
    <div v-if="!personal">
      <h2 class="mt-0 mb-1 pb-5 pa-4 pt-0">
        Comments, questions, thoughts?<br />
        Share them below:
      </h2>
      <v-form ref="form" v-model="form" class="formSheet">
        <v-row>
          <v-col cols="12" class="form_container pt-5 pl-8">
            <h3>Your name:</h3>

            <v-text-field
              class="form"
              width="100px"
              v-model="name"
              solo
              :rules="[rules.length(1)]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="form_container pt-0 pl-8">
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
          <v-col cols="12" md="10" lg="8" class="pt-0 pl-8">
            <h3>Your words:</h3>
            <v-textarea
              class="text-wrap"
              filled
              height="150px"
              v-model="comment"
              solo
              :rules="[rules.length(1)]"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- <v-row> -->
        <v-btn
          class="formButton ma-5 mt-3"
          @click="writeUserData()"
          :disabled="!form"
        >
          Submit comment
        </v-btn>
        <!-- </v-row> -->
      </v-form>
    </div>
  </v-container>
</template>

<script>
import { getDatabase, ref, set, onValue } from "firebase/database";

export default {
  props: ["personal"],
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
        email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
        length: (len) => (v) =>
          (v || "").length >= len ||
          `Invalid character length, required ${len}`,
      },
    };
  },
  created() {
    const db = getDatabase();
    const pageRef = ref(db, "pageRefs/");
    onValue(pageRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val() == this.slug) {
          this.pageId = childSnapshot.key;
        }
      });
    });
  },
  methods: {
    writeUserData() {
      const db = getDatabase();
      var id = this.name + Math.random().toString(16).slice(2);
      console.log(id);
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;
      set(ref(db, "pages/" + this.pageId + "/" + id), {
        name: this.name,
        email: this.email,
        comment: this.comment,
        dateTime: dateTime,
      });
      this.$refs.form.reset();
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
.form {
  max-width: 240px;
  margin-top: 4px;
  margin-bottom: 1px;
  padding-bottom: 1px;
}

.formSheet {
  background-color: #1b1d1e;
}
.formBackground {
  background-color: #363636;
}

.formEmail em {
  color: grey;
  font-style: normal;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: whitesmoke;
}
::v-deep .theme--light.v-btn.formButton {
  font-family: "valkyrieC4";
  font-weight: 400;
  color: white;
  background-color: #616161 !important;
  /* padding-top: 15px; */
  margin-top: 10px;
}
/* ::v-deep .theme--light.v-btn.formButton[disabled] {
  color: whitesmoke !important;
  background-color: #616161 !important;

  margin-top: 10px;
} */
</style>