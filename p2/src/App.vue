<template>
  <div id="app">
    <h1>Micro Blog</h1>
    <nav>
      <ul>
        <li>
          <router-link
            v-for="link in links"
            v-bind:key="link"
            v-bind:to="paths[link]"
            exact
          >{{ link }}</router-link>
        </li>
      </ul>
    </nav>
    <router-view
      v-bind:posts="posts"
      v-bind:comments="comments"
      v-on:update-posts="updatePosts()"
      v-on:update-comments="updateComments()"
    ></router-view>
  </div>
</template>

<script>
import { axios } from '@/app.js';

export default {
  name: 'App',
  data() {
    return {
      posts: [],
      comments: [],
      links: ['home', 'all', 'submit'],
      paths: {
        home: '/',
        all: '/all',
        submit: '/submit'
      }
    };
  },
  methods: {
    updatePosts() {
      axios.get('post').then((response) => {
        this.posts = response.data.post;
      });
    },
    updateComments() {
      axios.get('comment').then((response) => {
        this.comments = response.data.comment;
      });
    }
  },
  mounted() {
    this.updatePosts();
    this.updateComments();
  } 
};
</script>

<style src="./assets/style.css"></style>