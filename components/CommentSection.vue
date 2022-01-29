<template>
  <v-container>
    <v-row>
      <v-list>
        <v-list-item
          v-for="(item, index) in sortedComments"
          :key="index"
        >
        
          <v-list-item-content>
            <v-list-item-title class="commentTitle"> <em>{{index+1}}.</em> {{item.name}} ({{item.timeStamp.split(' ')[0]}})</v-list-item-title>
            <v-list-item-subtitle class="commentText" v-html="item.comment"></v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
      </v-list>
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
      commentData: null,
      comments: []
    };
  },
  created() {
    const db = getDatabase();
    // const pageRef = ref(db, "pageRefs/" + this.slug);
    // onValue(pageRef, (snapshot) => {
    //   this.pageId = snapshot.val();
    //   const commentsRef = ref(this.pageId + "/");
    //   // onValue(commentsRef, (snapshot) => {
    //   //   this.commentData = snapshot.val();
    //   //   console.log(this.commentData)
    //   // });
    // });
    const commentsRef = ref(db, "abc123425/");
    onValue(commentsRef, (snapshot) => {
      this.commentData = snapshot.val();
      this.comments = []
      snapshot.forEach((childSnapshot) => {
        var comment = {
          name: childSnapshot.val().name,
          comment: childSnapshot.val().comment,
          timeStamp: childSnapshot.val().dateTime,
        };
        this.comments.push(comment)
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val().comment;
        // console.log(childData)
      });
    });
  },
  computed: {
    sortedComments() {
      const sortedComments = this.comments.sort((a, b) => b.dateTime - a.dateTime)
      // this.comments.forEach((comment) =>{
      //   var date = comment.dateTime
      //   console.log(date)
      // }
      
      // )
      return sortedComments
    },
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
        const snapshot = await messageRef.once("value");
        alert(snapshot.val());
      } catch (e) {
        alert(e);
        return;
      }
    },
  },

};
</script>

<style scoped>
.commentTitle{
  font-size: 20px;
  font-family: valkyrieC4;
  padding-top: 10px;
  padding-bottom: 18px;
  color: rgb(116, 116, 116);
  
}
.commentTitle em{
  font-style: normal;
  color: rgb(0, 0, 0);
  
}
.commentText{
  font-size: 20px;
  font-family: Georgia;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 12px;
  color: rgb(0, 0, 0) !important;
  
}
</style>