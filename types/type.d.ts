export {};
import { INotification } from "@components/notify/src/notification";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $notify: INotification;
  }
}
