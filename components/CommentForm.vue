<template>
  <v-container class="commentFormWrap" md="10" lg="11">
    <div v-if="!personal" class="commentFormPanel">
      <div class="formIntro">
        <h2>Leave a comment</h2>
        <p>
          Comments are public. No email address is collected.
        </p>
      </div>

      <v-form
        ref="form"
        v-model="form"
        class="formSheet"
        lazy-validation
        @submit.prevent="writeUserData"
      >
        <v-row dense>
          <v-col cols="12">
            <label class="fieldLabel" for="comment-name">Name</label>
            <v-text-field
              id="comment-name"
              v-model="name"
              class="formField"
              solo
              flat
              dense
              :hide-details="!triedSubmit ? true : 'auto'"
              :rules="[rules.required('Name'), rules.maxLength(60)]"
            ></v-text-field>
          </v-col>
        </v-row>

        <label class="fieldLabel" for="comment-body">Comment</label>
        <v-textarea
          id="comment-body"
          v-model="comment"
          class="formField commentInput"
          height="120px"
          solo
          flat
          no-resize
          :hide-details="!triedSubmit ? true : 'auto'"
          :rules="[
            rules.required('Comment'),
            rules.minLength(3),
            rules.maxLength(1200),
            rules.cleanComment,
          ]"
        ></v-textarea>

        <label class="screenReaderOnly" for="comment-website">Website</label>
        <input
          id="comment-website"
          v-model="website"
          class="honeypot"
          type="text"
          tabindex="-1"
          autocomplete="off"
        />

        <div class="formActions">
          <v-btn
            class="formButton"
            type="submit"
            :disabled="submitting"
            :loading="submitting"
          >
            Submit comment
          </v-btn>
          <p v-if="statusMessage" :class="['formStatus', statusType]">
            {{ statusMessage }}
          </p>
        </div>
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
      comment: null,
      website: "",
      form: false,
      pageId: "test",
      submitting: false,
      statusMessage: "",
      statusType: "",
      triedSubmit: false,
      rules: {
        cleanComment: (v) =>
          this.hasCleanComment(v) ||
          "Please remove HTML, scripts, or extra links before submitting.",
        maxLength: (len) => (v) =>
          (v || "").trim().length <= len || `Keep this under ${len} characters`,
        minLength: (len) => (v) =>
          (v || "").trim().length >= len || `Use at least ${len} characters`,
        required: (field) => (v) =>
          !!(v || "").trim() || `${field} is required`,
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
    hasCleanComment(value) {
      const comment = (value || "").trim();
      const linkMatches = comment.match(/https?:\/\/|www\./gi) || [];
      const hasHtml = /<[^>]+>/.test(comment);
      const hasScriptText = /javascript:|onerror\s*=|onload\s*=/i.test(comment);
      const hasRepeatedChars = /(.)\1{24,}/.test(comment);

      return (
        comment.length > 0 &&
        linkMatches.length <= 1 &&
        !hasHtml &&
        !hasScriptText &&
        !hasRepeatedChars
      );
    },
    async writeUserData() {
      this.statusMessage = "";
      this.statusType = "";
      this.triedSubmit = true;

      if (this.website) {
        this.$refs.form.reset();
        this.triedSubmit = false;
        return;
      }

      if (!this.$refs.form.validate()) {
        return;
      }

      this.submitting = true;
      const db = getDatabase();
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const dateTime = new Date().toISOString();

      try {
        await set(ref(db, "pages/" + this.pageId + "/" + id), {
          name: this.name.trim(),
          comment: this.comment.trim(),
          dateTime: dateTime,
        });
        this.$refs.form.reset();
        this.triedSubmit = false;
        this.statusType = "success";
        this.statusMessage = "Thanks. Your comment has been submitted.";
      } catch (error) {
        this.statusType = "error";
        this.statusMessage = "Something went wrong. Please try again.";
      } finally {
        this.submitting = false;
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
.commentFormWrap {
  margin-top: 1.15rem;
  padding-left: 0;
  padding-right: 0;
}

.commentFormPanel {
  padding-top: 0.5rem;
}

.formIntro {
  margin-bottom: 0.8rem;
}

.formIntro h2 {
  margin: 0 0 0.25rem;
  font-family: "valkyrieC4";
  font-size: 1.25rem;
  line-height: 1.25;
  color: var(--site-title);
}

.formIntro p {
  max-width: none;
  margin: 0;
  color: var(--site-muted);
  font-size: 0.9rem;
  line-height: 1.45;
  background: transparent;
}

.formSheet {
  background: transparent;
}

.fieldLabel {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--site-text);
  font-family: "valkyrieC4";
  font-size: 0.95rem;
}

.formField {
  margin-bottom: 0.35rem;
}

.commentInput {
  margin-bottom: 0;
}

::v-deep .formField .v-input__slot {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px !important;
  background: var(--site-field) !important;
  box-shadow: none !important;
  min-height: 40px !important;
}

::v-deep .formField input,
::v-deep .formField textarea {
  color: var(--site-text) !important;
  font-family: Georgia, serif;
}

::v-deep .formField .v-counter,
::v-deep .formField .v-messages {
  color: var(--site-muted) !important;
}

.formActions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.9rem;
}

.formStatus {
  max-width: none;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
  background: transparent;
}

.formStatus.success {
  color: var(--site-success);
}

.formStatus.error {
  color: var(--site-error);
}

.honeypot {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.screenReaderOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

::v-deep .theme--light.v-btn.formButton {
  font-family: "valkyrieC4";
  font-weight: 400;
  color: white;
  min-height: 42px;
  padding: 0 1rem;
  border-radius: 8px;
  background-color: rgb(var(--site-accent-rgb) / 72%) !important;
  box-shadow: none;
  text-transform: none;
}

::v-deep .theme--light.v-btn.formButton:hover {
  background-color: rgb(var(--site-accent-rgb) / 88%) !important;
}

::v-deep .theme--light.v-btn.formButton.v-btn--disabled {
  color: rgba(255, 255, 255, 0.55) !important;
  background-color: var(--site-disabled) !important;
}

</style>
