<template>
  <div id="posts">
    <h2>All Micro Blog Posts</h2>
    <router-link
      v-for="post in reversedPosts"
      v-bind:key="post.id"
      v-bind:to="'/all/' + post.id"
      exact
    >
      <BlogPost v-bind:id="post.id"></BlogPost>
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
    reversedPosts() {
      return this.$store.state.posts.slice().reverse();
    },
  },
};
</script>