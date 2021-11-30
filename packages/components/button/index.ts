import { App } from "vue";
import Button from "./src/button.vue";

Button.install = (app: App) => {
  // 全局注册组件
  console.log("button组件注册全局");
  app.component(Button.name, Button);
};

const _Button = Button;
export default _Button;
