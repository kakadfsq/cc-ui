import { App } from "vue";
import ButtonGroup from "./src/button-group.vue";

ButtonGroup.install = (app: App) => {
  app.component(ButtonGroup.name, ButtonGroup);
};

const _ButtonGroup = ButtonGroup;
export default _ButtonGroup;
