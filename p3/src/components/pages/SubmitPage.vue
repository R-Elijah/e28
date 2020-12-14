<template>
  <div id="submit-post">
    <h4>Submit a post</h4>
    <h5>User: {{ username }}</h5>
    <div id="inputs">
      <label for="title">Title (Max 50 Characters)</label>
      <input
        type="text"
        v-model="post.title"
        placeholder="Enter a title..."
        @click="clearErrors"
        @blur="validate"
        id="title"
        data-test="submit-title"
      />
      <label for="body">Post (Max 5000 Characters)</label>
      <textarea
        v-model="post.body"
        placeholder="Your post content..."
        @click="clearErrors"
        @blur="validate"
        id="body"
        data-test="submit-body"
      ></textarea>
    </div>
    <button @click="submitPost" data-test="submit-button">Submit Post</button>

    <ErrorDisplay v-if="errors" v-bind:errors="errors"></ErrorDisplay>
    <ClientErrorDisplay
      v-if="clientErrors"
      v-bind:clientErrors="clientErrors"
    ></ClientErrorDisplay>
    <div id="success" v-if="showConfirmationMessage">
      <h3>Success!</h3>
      <router-link v-bind:to="'/all/'" exact
        >See your post on the main page...</router-link
      >
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
  data() {
    return {
      errors: null,
      clientErrors: {},
      showConfirmationMessage: false,
      post: {
        title: "",
        body: "",
        userName: "",
      },
    };
  },
  computed: {
    username() {
      return this.$store.state.user ? this.$store.state.user.name : "Anonymous";
    },
  },
  methods: {
    submitPost() {
      if (this.clientErrors["title"] || this.clientErrors["body"]) {
        return;
      }
      this.post.userName = this.username;
      axios.post("/post", this.post).then((response) => {
        if (response.data.errors) {
          this.errors = response.data.errors;
        } else {
          this.showConfirmationMessage = true;
          this.$store.dispatch("fetchPosts");

          this.post.body = "";
          this.post.title = "";
          setTimeout(() => (this.showConfirmationMessage = false), 2000);
        }
      });
    },
    clearErrors() {
      this.errors = null;
    },
    validate() {
      let validator = new Validator(this.post, {
        title: "required|max:50",
        body: "required|max:5000",
      });

      validator.setAttributeNames({ body: "post" });

      this.clientErrors = validator.errors.all();

      return validator.passes();
    },
  },
};
</script>

<style>
</style>