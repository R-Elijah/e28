<template>
  <div id="posts">
    <h2>All Micro Blog Posts</h2>
    <router-link
      v-for="post in reversedPosts"
      v-bind:key="post.id"
      v-bind:to="'/all/' + post.id"
      exact>
        <BlogPost v-bind:post="post"></BlogPost>
      </router-link>
  </div>
</template>

<script>
import BlogPost from '@/components/BlogPost.vue';

export default {
  name: '',
  props: ['posts'],
  components: {
      BlogPost
  },
  data() {
    return {};
  },
  computed: {
    reversedPosts() {
      return this.posts.slice().reverse()
    }
  }
}
</script>

<style>
</style>