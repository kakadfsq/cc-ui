import { ILoadingOptions } from "@components/loading/src/loading";
import { createVNode, h, render, Transition, vShow, withCtx, withDirectives, reactive, toRefs } from "vue";
import type { VNode } from "vue";

export const createLoadingComponent = function (options: ILoadingOptions) {
  let vm: VNode = null;

  const data = reactive({
    ...options,
    visible: false,
  });

  const handleAfterLeave = function () {
    console.log("handleAfterLeave");
    destorySelf();
  };

  const close = function () {
    data.visible = false;
  };

  const destorySelf = function () {
    if (vm?.el?.parentNode) {
      vm.el.parentNode.removeChild(vm.el);
    }
  };

  const componentSetup = {
    ...toRefs(data),
    handleAfterLeave,
    close,
  };

  const ccLoadingComponent = {
    name: "CcLoading",
    setup() {
      return componentSetup;
    },
    render() {
      const spinner = h("svg", { class: "circular", viewBox: "25 25 50 50" }, [
        h("circle", { class: "path", cx: "50", cy: 50, r: 20, fill: "none" }),
      ]);
      const noSpinner = h("i", { class: this.spinner });
      const spinnerText = h("p", { class: "cc-loading-text" }, [this.text]);

      return h(
        Transition,
        {
          name: "cc-loading-fade",
          onAfterLeave: this.handleAfterLeave,
        },
        {
          default: withCtx(() => [
            withDirectives(
              h(
                "div",
                {
                  style: { backgroundColor: this.background || "" },
                  class: ["cc-loading-mask", this.customClass, this.fullscreen ? "is-fullscreen" : ""],
                },
                h("div", { class: "cc-loading-spinner" }, [
                  !this.spinner ? spinner : noSpinner,
                  this.text ? spinnerText : "",
                ]),
              ),
              [[vShow, this.visible]],
            ),
          ]),
        },
      );
    },
  };

  vm = createVNode(ccLoadingComponent);

  render(vm, document.createElement("div"));

  return {
    ...componentSetup,
    vm,
    get $el() {
      return vm.el as HTMLElement;
    },
  };
};
