<template>
  <div id="comment">
    <div id="comment-username">{{ comment.userName }} at <div id="ts">{{ timestamp }}</div></div>
    <p id="comment-body">{{ comment.body }}</p>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['comment'],
  data() {
    return {};
  },
  computed: {
    timestamp() {
      return Date(this.comment.updated_at);
    }
  }
}
</script>

<style>
</style>