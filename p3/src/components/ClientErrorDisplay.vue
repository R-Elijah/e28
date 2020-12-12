<template>
  <div id="error">
    <ul v-for="(errors, index) in clientErrors" :key="index">
      <li v-for="(error, index) in errors" :key="index">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["clientErrors"],
  data() {
    return {};
  },
};
</script>