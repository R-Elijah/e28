<template>
  <div id="posts">
    <p>
      A work in progress micro blog site. You can find the last three written
      posts on this homepage or you can visit the "all" page to see a list of
      all posts ever. Clicking on any post will take you to the page for that
      post where you can comment and read comments from other users. You can
      also submit your own post in an anonymous fashion by clicking submit
      above, or login to submit under your username by clicking on account
      above.
    </p>
    <h2>Most Recent Micro Blog Posts</h2>
    <router-link
      v-for="post in recentPosts"
      v-bind:key="post.id"
      v-bind:to="'/all/' + post.id"
      exact
    >
      <BlogPost v-bind:id="post.id" data-test="home-post"></BlogPost>
    </router-link>
  </div>
</template>

<script>
import BlogPost from "@/components/BlogPost.vue";

export default {
  name: "",
  components: {
    BlogPost,
  },
  data() {
    return {};
  },
  computed: {
    recentPosts() {
      return this.$store.state.posts.slice(-3).reverse();
    },
  },
};
</script>

<style>
</style>