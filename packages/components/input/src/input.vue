<template>
  <div
    :class="[
      type === 'textarea' ? 'cc-textarea' : 'cc-input',
      size ? (type === 'textarea' ? 'cc-textarea--' + size : 'cc-input--' + size) : '',
      { 'is-disabled': isDisabled, 'is-hovering': isHovering, 'is-focused': isFocused },
    ]"
    @mouseenter="onmouseenter"
    @mouseleave="onmouseleave"
  >
    <template v-if="type !== 'textarea'">
      <!-- prepend -->
      <div v-if="$slots.prepend" class="cc-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <!-- prefix -->
      <span v-if="prefixIcon || $slots.prefix" class="cc-input__prefix">
        <slot name="prefix"></slot>
        <i :class="['cc-input__icon', prefixIcon]"></i>
      </span>
      <!-- input -->
      <input
        :aria-label="label"
        :disabled="disabled"
        :type="pwdVisible ? (pwdIsVisible ? 'text' : 'password') : type"
        :value="modelValue"
        class="cc-input__inner"
        v-bind="$attrs"
        @blur="handleBlur"
        @change="handleChange"
        @compositionend="handleCompositionEnd"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @focus="handleFocus"
        @input="handleInput"
      />
      <!-- suffix -->
      <span v-if="suffixVisible" class="cc-input__suffix">
        <slot name="suffix"></slot>
        <i v-if="suffixIcon" :class="[suffixIcon, 'cc-input__icon']"></i>
        <i v-if="clearIconVisible" class="cc-icon-close-circle cc-input__icon cc-input__clickable" @click="clear"></i>
        <i
          v-if="pwdVisible"
          :class="[pwdIsVisible ? 'cc-icon-eye-close' : 'cc-icon-eye', 'cc-input__icon', 'cc-input__clickable']"
          @click="handlePwdVisible"
        ></i>
        <span v-if="wordLimitVisible" class="cc-input__count">{{ modelValue.length }}/{{ maxlength }}</span>
      </span>
      <!-- append -->
      <div v-if="$slots.append" class="cc-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea
        :aria-label="label"
        :class="['cc-textarea__inner', { 'is-counting': wordLimitVisible }]"
        :disabled="disabled"
        :value="modelValue"
        v-bind="$attrs"
        @blur="handleBlur"
        @change="handleChange"
        @focus="handleFocus"
        @input="handleInput"
      ></textarea>
      <span v-if="wordLimitVisible" class="cc-textarea__count">{{ modelValue.length }}/{{ maxlength }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { CommonSize } from "@packages/utils/types";
import { computed, ref } from "vue";

type AutosizeProp = boolean | { minRows?: number; maxRows?: number };

export default {
  name: "CcInput",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: [String, Number],
      default: 0,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<CommonSize>,
      default: "",
    },
    prefixIcon: {
      type: String,
      default: "",
    },
    suffixIcon: {
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 2,
    },
    autosize: {
      type: [Boolean, Object] as PropType<AutosizeProp>,
      default: false as AutosizeProp,
    },
    autocomplete: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    resize: {
      type: String as PropType<"none" | "both" | "horizontal" | "vertical">,
      validator: (val: string) => {
        return ["none", "both", "horizontal", "vertical"].includes(val);
      },
      default: "none",
    },
    form: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: [
    "update:modelValue",
    "change",
    "focus",
    "blur",
    "input",
    "clear",
    "compositionstart",
    "compositionupdate",
    "compositionend",
  ],
  setup(props, ctx) {
    const isHovering = ref(false);
    const isFocused = ref(false);
    const pwdIsVisible = ref(false);
    const isComposing = ref(false);

    const isDisabled = computed(() => {
      return props.disabled || props.readonly;
    });

    const wordLimitVisible = computed(() => {
      return props.showWordLimit && props.maxlength && (props.type === "text" || props.type === "textarea");
    });

    const clearIconVisible = computed(() => {
      return props.modelValue.length > 0 && props.clearable && !isDisabled.value;
    });

    const pwdVisible = computed(() => {
      return props.type === "password" && props.showPassword && !isDisabled.value;
    });

    const suffixVisible = computed(() => {
      return clearIconVisible.value || pwdVisible.value || wordLimitVisible.value || props.suffixIcon;
    });

    const onmouseenter = () => {
      isHovering.value = true;
    };

    const onmouseleave = () => {
      isHovering.value = false;
    };

    const handleInput = (event) => {
      if (isComposing.value) return;

      let { value } = event.target;

      const maxlength = Number(props.maxlength);
      if (maxlength) {
        const sliceIndex = value.length > maxlength ? maxlength : value.length;
        value = Array.from(value).slice(0, sliceIndex).join("");
      }
      event.target.value = value;
      ctx.emit("update:modelValue", value);
    };

    const handleFocus = (event) => {
      isFocused.value = true;
      ctx.emit("focus", event);
    };

    const handleBlur = (event) => {
      isFocused.value = false;
      ctx.emit("blur", event);
    };

    const handleChange = (event) => {
      const { value } = event.target;
      ctx.emit("change", value);
    };

    const clear = () => {
      ctx.emit("update:modelValue", "");
      ctx.emit("clear");
      ctx.emit("input", "");
      ctx.emit("change", "");
    };

    const handlePwdVisible = () => {
      pwdIsVisible.value = !pwdIsVisible.value;
    };

    const handleCompositionStart = (event) => {
      isComposing.value = true;
      ctx.emit("compositionstart", event);
    };

    const handleCompositionUpdate = (event) => {
      isComposing.value = true;
      ctx.emit("compositionupdate", event);
    };

    const handleCompositionEnd = (event) => {
      console.log(event);
      isComposing.value = false;
      handleInput(event);
      ctx.emit("compositionend", event);
    };

    const handleAutosize = () => {
      console.log(1212);
    };

    return {
      isHovering,
      isFocused,
      isDisabled,
      wordLimitVisible,
      clearIconVisible,
      pwdVisible,
      suffixVisible,
      pwdIsVisible,
      onmouseenter,
      onmouseleave,
      handleFocus,
      handleInput,
      handleBlur,
      handleChange,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      clear,
      handlePwdVisible,
    };
  },
};
</script>

<style scoped></style>
