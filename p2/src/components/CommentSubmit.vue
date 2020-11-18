<template>
  <div>
    <h4>Submit a comment</h4>
    <div id="inputs">
      <label for="userName">Username (Max 20 Characters)</label>
      <input type="text" v-model="comment.userName" id="userName" />
      <label for="body">Comment (Max 200 Characters)</label>
      <textarea v-model="comment.body" id="body"></textarea>
      <input type="number" v-model="comment.postID" id="postID" readonly />
    </div>
    <button @click="submitComment">Submit Comment</button>
    <div id="error" v-if="errors">{{ errors }}</div>
    <div id="success" v-if="showConfirmationMessage">
      <h3>Success!</h3>
    </div>
  </div>
</template>

<script>
import { axios } from '@/app.js';

export default {
  name: '',
  props: ['id'],
  data() {
    return {
      errors: null,
      showConfirmationMessage: false,
      comment: {
        userName: 'Enter a username...',
        body: 'Your comment...',
        postID: this.id
      }
    };
  },
  methods: {
    submitComment() {
      axios.post('/comment', this.comment).then((response) => {
        if (response.data.errors) {
          this.errors = response.data.errors;
        } else {
            this.$emit('update-comments');
            this.showConfirmationMessage = true;
        }
      });
    }
  }
}
</script>

<style>
</style>