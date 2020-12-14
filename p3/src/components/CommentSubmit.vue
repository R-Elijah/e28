<template>
  <div>
    <h4 data-test="comment-form">Submit a comment</h4>
    <div id="inputs">
      <h5>User: {{ username }}</h5>
      <label for="body">Comment (Max 200 Characters)</label>
      <textarea
        v-model="comment.body"
        placeholder="Your comment..."
        @click="clearErrors"
        @blur="validate"
        id="body"
        data-test="comment-body-submit"
      ></textarea>
    </div>
    <button @click="submitComment" data-test="comment-submit">
      Submit Comment
    </button>
    <ErrorDisplay v-if="errors" v-bind:errors="errors"></ErrorDisplay>
    <ClientErrorDisplay
      v-if="clientErrors"
      v-bind:clientErrors="clientErrors"
    ></ClientErrorDisplay>
    <div id="success" v-if="showConfirmationMessage">
      <h3>Success!</h3>
    </div>
  </div>
</template>

<script>
import { axios } from "@/app.js";
import Validator from "validatorjs";
import ClientErrorDisplay from "@/components/ClientErrorDisplay.vue";
import ErrorDisplay from "@/components/ErrorDisplay.vue";

export default {
  name: "",
  components: {
    ClientErrorDisplay,
    ErrorDisplay,
  },
  props: ["id"],
  data() {
    return {
      errors: null,
      clientErrors: {},
      showConfirmationMessage: false,
      comment: {
        userName: "",
        body: "",
        postID: this.id,
      },
    };
  },
  computed: {
    username() {
      return this.$store.state.user ? this.$store.state.user.name : "Anonymous";
    },
  },
  methods: {
    submitComment() {
      if (this.clientErrors["body"]) {
        return;
      }
      this.comment.userName = this.username;
      axios.post("/comment", this.comment).then((response) => {
        if (response.data.errors) {
          this.errors = response.data.errors;
        } else {
          this.showConfirmationMessage = true;
          this.$store.dispatch("fetchComments");

          this.comment.body = "";
          setTimeout(() => (this.showConfirmationMessage = false), 2000);
        }
      });
    },
    clearErrors() {
      this.errors = null;
    },
    validate() {
      let validator = new Validator(this.comment, {
        body: "required|max:200",
      });

      validator.setAttributeNames({ body: "comment" });

      this.clientErrors = validator.errors.all();

      return validator.passes();
    },
  },
};
</script>

<style>
</style>