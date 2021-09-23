import Loading from "./index";
import { ILoadingOptions } from "@components/loading/src/loading";
const createInstance = function (el, binding) {
  const text = el.getAttribute("cc-loading-text");
  const spinner = el.getAttribute("cc-loading-spinner");
  const background = el.getAttribute("cc-loading-background");
  const customClass = el.getAttribute("cc-loading-custom-class");

  const options: ILoadingOptions = {
    text,
    spinner,
    background,
    customClass,
    fullscreen: !!binding.modifiers.fullscreen,
    target: !!binding.modifiers.fullscreen ? null : el,
    body: !!binding.modifiers.body,
    lock: !!binding.modifiers.lock,
    visible: true,
  };
  el.instance = Loading(options);
};
const vLoading = {
  mounted(el, binding) {
    console.log(el, binding);
    // 标签出现指令，未赋值是为undefined
    if (!!binding.value) {
      createInstance(el, binding);
    }
  },
  updated(el, binding) {
    console.log(el, binding);
    const instance = el.instance;
    if (binding.oldValue !== binding.value) {
      if (binding.value) {
        createInstance(el, binding);
      } else {
        instance.close();
      }
    }
  },
  unmounted(el) {
    el?.instance?.close();
  },
};

export default vLoading;
