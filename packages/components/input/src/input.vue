<template>
  <input type="text" />
</template>

<script>
export default {
  name: "CcInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    maxlength: {
      type: Number,
    },
  },
};
</script>

<style scoped></style>
