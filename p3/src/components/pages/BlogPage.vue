<template>
  <div id="post-page">
    <div v-if="post">
      <BlogPost v-bind:id="id"></BlogPost>
      <CommentSubmit v-bind:id="id" v-on="$listeners"></CommentSubmit>
      <h2>Comments</h2>
      <ShowComment
        v-for="comment in postComments"
        v-bind:key="comment.id"
        v-bind:id="comment.id"
      ></ShowComment>
    </div>

    <div v-if="postNotFound">
      <p>Post with id {{ id }} not found.</p>
      <router-link v-bind:to="'/all'">Go back to all posts.</router-link>
    </div>
  </div>
</template>

<script>
import BlogPost from "@/components/BlogPost.vue";
import CommentSubmit from "@/components/CommentSubmit.vue";
import ShowComment from "@/components/ShowComment.vue";

export default {
  name: "",
  props: ["id"],
  components: {
    BlogPost,
    CommentSubmit,
    ShowComment,
  },
  data() {
    return {};
  },
  computed: {
    post() {
      return this.$store.getters.getPostById(this.id);
    },
    postNotFound() {
      return this.post == null;
    },
    // Retrieves all the comments that are associated with this post by postID
    postComments() {
      return this.$store.getters.getPostComments(this.id);
    },
  },
};
</script>

<style>
</style>