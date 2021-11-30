<template>
  <cc-input v-model="text" clearable placeholder="Please input" rows="4" show-word-limit type="textarea"></cc-input>
  {{ text }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "@styles/index.scss";
import { CcInput } from "@packages/index";

export default defineComponent({
  name: "App",
  components: {},
  data: () => {
    return {
      text: "",
    };
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
div {
  margin-bottom: 15px;
}
</style>
