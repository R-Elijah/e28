<template>
  <div id="post">
    <div id="post-title">{{ post.title }}</div>
    <p id="post-body">{{ post.body }}</p>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['post'],
  data() {
    return {};
  }
}
</script>

<style>
</style>