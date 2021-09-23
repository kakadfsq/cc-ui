import { ILoadingOptions } from "./loading";
import { isServer } from "@packages/utils/common";
import { createLoadingComponent } from "@components/loading/src/createLoadingComponent";
import { nextTick } from "vue";

const defaults: ILoadingOptions = {
  target: document.body,
  body: false,
  fullscreen: true,
  lock: false,
  text: "",
  spinner: "",
  background: "",
  customClass: "",
};

const Loading = function (options: ILoadingOptions) {
  if (isServer) return;
  options = {
    ...defaults,
    ...options,
  };

  if (typeof options.target === "string") {
    options.target = document.querySelector(options.target) as HTMLElement;
  }
  options.target = options.target || document.body;
  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    options.body = true;
  }

  const parent = options.body ? document.body : options.target;
  options.parent = parent;

  const instance = createLoadingComponent(options);

  options.parent.appendChild(instance.$el);

  nextTick().then(() => {
    instance.visible.value = options.hasOwnProperty("visible") ? options.visible : true;
  });

  return instance;
};

export default Loading;
