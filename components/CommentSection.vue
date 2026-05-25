<template>
  <v-container class="commentSectionWrap">
    <div class="sep">
      <h1 class="header">Questions, thoughts?</h1>
      <p v-if="personal" class="personalNote">
        No comments here, this page is too personal.
      </p>
    </div>

    <div v-if="!personal" class="commentList" aria-live="polite">
      <p v-if="sortedComments.length === 0" class="emptyNote">
        No comments yet. Be the first to leave one below.
      </p>
      <article
        v-for="(item, index) in sortedComments"
        :key="item.id || index"
        class="comment"
        :style="{ animationDelay: index * 60 + 'ms' }"
      >
        <header class="commentMeta">
          <span class="commentNum">{{ index + 1 }}</span>
          <span class="commentName">{{ item.name }}</span>
          <time class="commentDate" :datetime="item.timeStamp">
            {{ formatDate(item.timeStamp) }}
          </time>
        </header>
        <p class="commentBody">{{ item.comment }}</p>
      </article>
    </div>
  </v-container>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";

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
            id: childSnapshot.key,
            name: childSnapshot.val().name,
            comment: childSnapshot.val().comment,
            timeStamp: childSnapshot.val().dateTime,
          };
          this.comments.push(comment);
        });
      });
    });
  },
  computed: {
    sortedComments() {
      if (this.comments.length == 0) {
        return [];
      }

      const sortedComments = [...this.comments].sort(
        (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
      );
      return sortedComments;
    },
  },
  methods: {
    formatDate(timeStamp) {
      const date = new Date(timeStamp);
      if (Number.isNaN(date.getTime())) {
        return "";
      }

      return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    },
  },
};
</script>

<style scoped>
.commentSectionWrap {
  padding-left: 0;
  padding-right: 0;
}

.sep {
  display: block;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.header {
  font-family: valkyrieC4;
  font-size: 1.65rem;
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
  margin-top: 1rem;
  max-width: 620px;
}

.comment {
  position: relative;
  padding: 0.75rem 0.9rem 0.8rem;
  margin-bottom: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid rgba(0, 230, 255, 0.45);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.035);
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  animation: commentIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.comment:hover {
  background: rgba(255, 255, 255, 0.05);
  border-left-color: rgba(0, 230, 255, 0.7);
  transform: translateY(-1px);
}

.commentMeta {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  margin-bottom: 0.3rem;
  font-family: valkyrieC4;
}

.commentNum {
  color: rgb(0 230 255 / 87%);
  font-size: 0.95rem;
}

.commentName {
  color: rgb(225, 225, 225);
  font-size: 1rem;
  overflow-wrap: anywhere;
}

.commentDate {
  margin-left: auto;
  color: rgb(116, 116, 116);
  font-size: 0.78rem;
  letter-spacing: 0.02em;
}

.commentBody {
  font-family: Georgia, serif;
  font-size: 0.95rem;
  line-height: 1.55;
  color: rgb(212, 212, 212);
  margin: 0;
  max-width: none;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
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

@media (max-width: 600px) {
  .commentMeta {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .commentDate {
    margin-left: 0;
    width: 100%;
  }
}
</style>
