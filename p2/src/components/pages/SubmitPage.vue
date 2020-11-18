<template>
  <div id="submit-post">
    <h4>Submit a post</h4>
    <div id="inputs">
      <label for="title">Title (Max 50 Characters)</label>
      <input type="text" v-model="post.title" id="userName" />
      <label for="body">Post (Max 5000 Characters)</label>
      <textarea v-model="post.body" id="body"></textarea>
    </div>
    <button @click="submitPost">Submit Post</button>

    <div id="error" v-if="errors">{{ errors }}</div>
    <div id="success" v-if="showConfirmationMessage">
      <h3>Success!</h3>
      <router-link
        v-bind:to="'/all/'"
        exact>See your post on the main page...</router-link>
    </div>
  </div>
</template>

<script>
import { axios } from '@/app.js';

export default {
  name: '',
  data() {
    return {
      errors: null,
      showConfirmationMessage: false,
      post: {
        title: 'Enter a title...',
        body: 'Your post content...'
      }
    };
  },
  methods: {
    submitPost() {
      axios.post('/post', this.post).then((response) => {
        if (response.data.errors) {
          this.errors = response.data.errors;
        } else {
            this.$emit('update-posts');
            this.showConfirmationMessage = true;
        }
      });
    }
  }
}
</script>

<style>
</style>