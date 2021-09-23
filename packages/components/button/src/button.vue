<template>
  <button
    :class="[
      'cc-button',
      type ? `cc-button--${type}` : '',
      size ? `cc-button--${size}` : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <i v-if="loading" class="cc-icon-sync"></i>
    <i v-if="icon && !loading" :class="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";
import { validateCommonSize } from "../../../utils/utils";

type CcButtonType = PropType<"primary" | "success" | "warning" | "danger" | "info" | "text" | "default">;
type CcButtonNativeType = PropType<"button" | "submit" | "reset">;

export default defineComponent({
  name: "CcButton",
  props: {
    type: {
      type: String as CcButtonType,
      default: "default",
      validator: (val: string) => {
        return ["primary", "success", "warning", "danger", "info", "text", "default"].includes(val);
      },
    },
    size: {
      type: String as PropType<CommonSize>,
      default: "large",
      validator: validateCommonSize,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    nativeType: {
      type: String as CcButtonNativeType,
      default: "button",
      validator: (val: string) => {
        return ["button", "submit", "reset"].includes(val);
      },
    },
  },
  emits: ["click"],
  setup(props, ctx) {
    const handleClick = (evt: any) => {
      ctx.emit("click", evt);
    };

    return { handleClick };
  },
});
</script>

<style scoped></style>
