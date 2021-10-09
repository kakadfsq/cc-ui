import { App } from "vue";
import Input from "./src/input.vue";

Input.install = (app: App) => {
  app.component(Input.name, Input);
};

const _Input = Input;
export default _Input;
