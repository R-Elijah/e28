<template>
  <div id="comment">
    <div id="comment-username" data-test="comment-username">
      {{ comment.userName }}
      <div id="ts">{{ timestamp }}</div>
    </div>
    <p id="comment-body" data-test="comment-body">{{ comment.body }}</p>
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
    comment() {
      return this.$store.getters.getCommentById(this.id);
    },
    timestamp() {
      return new Date(this.comment.updated_at);
    },
  },
};
</script>