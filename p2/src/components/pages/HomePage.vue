<template>
  <div id="posts">
    <h2>Most Recent Micro Blog Posts</h2>
    <router-link
      v-for="post in recentPosts"
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
    recentPosts() {
      return this.posts.slice(-3).reverse()
    }
  }
}
</script>

<style>
</style>