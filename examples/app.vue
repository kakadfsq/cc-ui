<template>
  <div
    v-loading.fullscreen="loading"
    cc-loading-text="拼命加载中"
    cc-loading-spinner="cc-icon-transaction"
    cc-loading-background="rgba(0, 0, 0, 0.8)"
    style="position: relative"
  >
    <table>
      <tr>
        <th>123123</th>
        <th>123123</th>
        <th>123123</th>
        <th>123123</th>
        <th>123123</th>
        <th>123123</th>
      </tr>
      <tr>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
      </tr>
      <tr>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
      </tr>
      <tr>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
      </tr>
      <tr>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
        <td>tdtdtdtdtdtdtttttt</td>
      </tr>
    </table>
  </div>
  <cc-button @click="openLoading"></cc-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "@styles/index.scss";
import CcButton from "@components/button/src/button.vue";

export default defineComponent({
  name: "App",
  components: {},
  data: () => {
    return {
      loading: true,
    };
  },
  methods: {
    clickHandle() {
      this.$notify({
        title: "HTML 片段",
        dangerouslyUseHTMLString: true,
        message: "<strong>这是 <i>HTML</i> 片段</strong>",
      });
    },
    openLoading() {
      console.log("openLoading");
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        // spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      setTimeout(() => {
        loading.close();
      }, 3000);

      this.loading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
div {
  margin-bottom: 15px;
}
</style>
