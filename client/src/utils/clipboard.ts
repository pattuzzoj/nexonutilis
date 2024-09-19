import { createSignal } from "solid-js";

const [copyNotification, setCopyNotification] = createSignal("");

const copy = (url: string) => {
  navigator.clipboard.writeText(url);
  setCopyNotification(url);
  setTimeout(() => setCopyNotification(""), 500);
};

export { copy, copyNotification };
