import type { App } from "vue";
import CcButton from "./components/button/index";
import CcButtonGroup from "@components/button-group/index";
import CcNotify from "@components/notify/index";
import CcLoading from "@components/loading/index";
import CcInput from "@components/input/index";

const components = [CcButton, CcButtonGroup, CcInput];

const plugins = [CcNotify, CcLoading];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });

  plugins.forEach((plugin) => {
    app.use(plugin as any);
  });
};

export { CcButton, CcButtonGroup, CcInput, CcNotify, CcLoading, install };

export default { install };
