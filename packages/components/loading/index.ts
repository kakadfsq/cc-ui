import { App } from "vue";
import Loading from "./src/index";
import vLoading from "./src/directive";

export default {
  install(app: App) {
    app.directive("loading", vLoading);
    app.config.globalProperties.$loading = Loading;
  },
  service: Loading,
  directive: vLoading,
};
