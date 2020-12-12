<template>
  <div id="error" v-if="errors">
    <ul v-for="(error, index) in errors" :key="index">
      <li v-for="(item, index) in error" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["errors"],
  data() {
    return {};
  },
};
</script>