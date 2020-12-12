<template>
  <div>
    <div v-if="user" id="posts">
      <h2>Your Subscriptions</h2>
      <router-link
        v-for="post in subscribedPosts"
        v-bind:key="post.id"
        v-bind:to="'/all/' + post.id"
        exact
      >
        <BlogPost v-bind:id="post.id"></BlogPost>
      </router-link>
    </div>

    <div v-else>
      <p>
        You need to be logged in to view your subscriptions. Log in on the
        account page.
      </p>
    </div>
  </div>
</template>

<script>
import BlogPost from "@/components/BlogPost.vue";
import { axios } from "@/app.js";

export default {
  name: "",
  components: {
    BlogPost,
  },
  data() {
    return {
      subscriptions: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    subscribedPosts() {
      // Goes through all posts and returns a reversed array of posts that has an author the user has subscribed to.
      let subs = this.subscriptions;
      let result = this.$store.state.posts.filter(function (post) {
        let found = subs.find(function (subscription) {
          return subscription.sub == post.userName;
        });
        if (found === undefined) {
          return false;
        } else {
          return true;
        }
      });
      return result.reverse();
    },
  },
  methods: {
    loadSubscriptions() {
      if (this.user) {
        axios.get("subscription").then((response) => {
          this.subscriptions = response.data.subscription.map(
            (subscription) => {
              return subscription;
            }
          );
        });
      }
    },
  },
  watch: {
    user() {
      this.loadSubscriptions();
    },
  },
  mounted() {
    this.loadSubscriptions();
  },
};
</script>