<template>
  <div id="post">
    <div id="post-title">{{ post.title }}</div>
    <p id="post-body">{{ post.body }}</p>
    <div id="blog-username">
      By {{ post.userName }}
      <div id="ts">{{ timestamp }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["id"],
  data() {
    return {};
  },
  computed: {
    post() {
      return this.$store.getters.getPostById(this.id);
    },
    timestamp() {
      return new Date(this.post.updated_at);
    },
  },
};
</script>

<style>
</style>