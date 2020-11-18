<template>
  <div id="post-page">
    <div v-if="post">
      <BlogPost v-bind:post="post"></BlogPost>
      <CommentSubmit v-bind:id="id"
      v-on="$listeners"></CommentSubmit>
      <h2>Comments</h2>
      <ShowComment
        v-for="comment in postComments"
        v-bind:key="comment.id"
        v-bind:comment="comment"></ShowComment>
    </div>

    <div v-if="postNotFound">
      <p>Post with id {{ id }} not found.</p>
      <router-link v-bind:to="'/all'">Go back to all posts.</router-link>
    </div>
  </div>
</template>

<script>
import BlogPost from '@/components/BlogPost.vue';
import CommentSubmit from '@/components/CommentSubmit.vue';
import ShowComment from '@/components/ShowComment.vue';

export default {
  name: '',
  props: ['id', 'posts', 'comments'],
  components: {
    BlogPost,
    CommentSubmit,
    ShowComment
  },
  data() {
    return {};
  },
  computed: {
    post() {
      return this.posts.filter((post) => {
        return post.id == this.id;
      }, this.id)[0]
    },
    postNotFound() {
      return this.post == null;
    },
    // Retrieves all the comments that are associated with this post by postID
    postComments() {
      return this.comments.filter((comment) => {
        return comment.postID == this.id;
      }, this.id)
    }
  }
}
</script>

<style>
</style>