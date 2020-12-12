<template>
  <div id="app">
    <h1>Micro Blog</h1>
    <nav>
      <ul>
        <li class="nav">
          <router-link
            v-for="link in links"
            v-bind:key="link"
            v-bind:to="paths[link]"
            exact
          >{{ link }}</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      links: ['home', 'all', 'submit', 'account', 'subscriptions'],
      paths: {
        home: '/',
        all: '/all',
        submit: '/submit',
        account: '/account',
        subscriptions: '/subscriptions'
      }
    };
  },
  mounted() {
    this.$store.dispatch('fetchPosts');
    this.$store.dispatch('fetchComments');
    this.$store.dispatch('authUser');
  } 
};
</script>

<style src="./assets/style.css"></style>