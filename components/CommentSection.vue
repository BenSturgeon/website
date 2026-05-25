<template>
  <v-container>
    <v-row class="sep">
      <h1 class="header">Questions, thoughts?</h1>
      <p v-if="personal" class="personalNote">
        No comments here, this page is too personal.
      </p>
    </v-row>

    <div v-if="!personal" class="commentList">
      <p v-if="sortedComments.length === 0" class="emptyNote">
        No comments yet — be the first to leave one below.
      </p>
      <article
        v-for="(item, index) in sortedComments"
        :key="index"
        class="comment"
        :style="{ animationDelay: index * 60 + 'ms' }"
      >
        <header class="commentMeta">
          <span class="commentNum">{{ index + 1 }}</span>
          <span class="commentName">{{ item.name }}</span>
          <span class="commentDate">{{ item.timeStamp.split(" ")[0] }}</span>
        </header>
        <div class="commentBody" v-html="item.comment"></div>
      </article>
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
      commentData: null,
      comments: [],
      pageId: null,
      enabled: false,
      // personal: false,
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
.sep {
  display: block;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.header {
  font-family: valkyrieC4;
  font-size: 2.4rem;
  color: rgb(255, 255, 255);
  margin: 0 0 0.25rem;
  padding-bottom: 0.25rem;
}

.personalNote,
.emptyNote {
  color: rgb(116, 116, 116);
  font-family: Georgia, serif;
  font-style: italic;
}

.commentList {
  margin-top: 1.25rem;
}

.comment {
  position: relative;
  max-width: 680px;
  padding: 0.85rem 1.1rem 0.95rem;
  margin-bottom: 1rem;
  border-left: 2px solid rgba(0, 230, 255, 0.3);
  border-radius: 0 6px 6px 0;
  background: rgba(255, 255, 255, 0.025);
  transition: background 0.2s ease, border-color 0.2s ease;
  animation: commentIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.comment:hover {
  background: rgba(255, 255, 255, 0.05);
  border-left-color: rgba(0, 230, 255, 0.7);
}

.commentMeta {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  margin-bottom: 0.4rem;
  font-family: valkyrieC4;
}

.commentNum {
  color: rgb(0 230 255 / 87%);
  font-size: 0.95rem;
}

.commentName {
  color: rgb(225, 225, 225);
  font-size: 1.1rem;
}

.commentDate {
  margin-left: auto;
  color: rgb(116, 116, 116);
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}

.commentBody {
  font-family: Georgia, serif;
  font-size: 1.02rem;
  line-height: 1.65;
  color: rgb(212, 212, 212);
  white-space: normal;
}

.commentBody >>> a {
  color: rgb(0 230 255 / 87%);
}

@keyframes commentIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .comment {
    animation: none;
  }
}
</style>