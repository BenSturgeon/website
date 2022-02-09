<template>
  <v-container>
    <H1 class="header">Comments</H1>
    <v-row>
      <v-list>
        <v-list-item v-for="(item, index) in sortedComments" :key="index">
          <v-list-item-content>
            <v-list-item-title class="commentTitle">
              <em>{{ index + 1 }}.</em> {{ item.name }} ({{
                item.timeStamp.split(" ")[0]
              }})</v-list-item-title
            >
            <v-list-item-subtitle
              class="commentText"
              v-html="item.comment"
            ></v-list-item-subtitle>
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
      comments: [],
      pageId: null,
    };
  },
  created() {
    const db = getDatabase();
    const pageRef = ref(db, "pageRefs/");
    onValue(pageRef, (snapshot) => {
      this.pageId = snapshot.val();
      var key = null;
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val() == this.slug) {
          key = childSnapshot.key;
        }
      });
      const commentsRef = ref(db, "pages/" + key + "/");
      console.log(commentsRef);

      onValue(commentsRef, (snapshot) => {
        this.commentData = snapshot.val();
        this.comments = [];

        snapshot.forEach((childSnapshot) => {
          var comment = {
            name: childSnapshot.val().name,
            comment: childSnapshot.val().comment,
            timeStamp: childSnapshot.val().dateTime,
          };
          this.comments.push(comment);
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val().comment;
        });
      });
    });
  },
  computed: {
    sortedComments() {
      if (this.comments.length == 0) {
        return [];
      }

      const sortedComments = this.comments.sort(
        (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
      );
      return sortedComments;
    },
  },
};
</script>

<style scoped>
.commentTitle {
  font-size: 20px;
  font-family: valkyrieC4;
  padding-top: 10px;
  padding-bottom: 18px;
  color: rgb(116, 116, 116);
}
.commentTitle em {
  font-style: normal;
  color: rgb(0, 0, 0);
}
.commentText {
  font-size: 20px;
  font-family: Georgia;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 12px;
  color: rgb(0, 0, 0) !important;
}

.header {
  display: flex;
  margin: 3px;
  align-items: center;
  /* margin-bottom: 1rem; */
  padding-bottom: 0.5rem;
  font-size: 3rem;
  color: black;
  font-family: valkyrieC4;
}
</style>