<template>
  <transition name="cc-notification-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      :class="['cc-notification', customClass, horizontalClass]"
      :style="verticalPositionStyle"
      @click="onClick"
    >
      <i v-if="iconClass || typeClass" class="cc-notification__icon" :class="[iconClass, typeClass]"></i>
      <div class="cc-notification__container">
        <h2 class="cc-notification__title" v-text="title"></h2>
        <div class="cc-notification__content">
          <slot>
            <p v-if="dangerouslyUseHTMLString" v-html="message"></p>
            <p v-else>{{ message }}</p>
          </slot>
        </div>
        <div v-if="showClose" class="cc-notification__closeBtn" @click.stop="close">
          <i class="cc-icon-close"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { computed, defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import { NotificationVM, Position } from "./notification";
import { on, off } from "@packages/utils/dom";
import { EVENT_CODE } from "@packages/utils/aria";

const TypeMap: Indexable<string> = {
  success: "cc-icon-check-circle-fill",
  warning: "cc-icon-warning-circle-fill",
  error: "cc-icon-close-circle-fill",
  info: "cc-icon-info-circle-fill",
};

export default defineComponent({
  name: "CcNotification",
  props: {
    id: { type: String, default: "" },
    title: { type: String, default: "" },
    message: {
      type: [String, Object] as PropType<string | NotificationVM>,
      default: "",
    },
    dangerouslyUseHTMLString: { type: Boolean, default: false },
    type: { type: String, default: "" },
    iconClass: { type: String, default: "" },
    customClass: { type: String, default: "" },
    duration: { type: Number, default: 4500 },
    position: {
      type: String as PropType<Position>,
      default: "top-right",
    },
    showClose: { type: Boolean, default: true },
    onClose: { type: Function as PropType<() => void>, default: () => void 0 },
    onClick: { type: Function as PropType<() => void>, default: () => void 0 },
    offset: { type: Number, default: 0 },
  },
  emits: ["destroy"],
  setup(props) {
    let timer = null;
    const visible = ref(false);
    const typeClass = computed(() => {
      const type = props.type;
      return (type && TypeMap[type]) || "";
    });

    const horizontalClass = computed(() => {
      return props.position.includes("right") ? "right" : "left";
    });

    const verticalPosition = computed(() => {
      return props.position.startsWith("top") ? "top" : "bottom";
    });

    const verticalPositionStyle = computed(() => {
      return {
        [verticalPosition.value]: `${props.offset}px`,
      };
    });

    function close() {
      visible.value = false;
    }
    function startTimer() {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          if (visible.value) {
            close();
          }
        }, props.duration);
      }
    }

    function clearTimer() {
      clearTimeout(timer);
      timer = null;
    }

    function onKeydown({ code }: KeyboardEvent) {
      if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
        clearTimer(); // press delete/backspace clear timer
      } else if (code === EVENT_CODE.esc) {
        // press esc to close the notification
        if (visible.value) {
          close();
        }
      } else {
        startTimer(); // resume timer
      }
    }

    onMounted(() => {
      startTimer();
      visible.value = true;
      on(document, "keydown", onKeydown);
    });

    onBeforeUnmount(() => {
      off(document, "keydown", onKeydown);
    });

    return {
      typeClass,
      horizontalClass,
      verticalPositionStyle,
      visible,
      close,
    };
  },
});
</script>

<style scoped></style>
