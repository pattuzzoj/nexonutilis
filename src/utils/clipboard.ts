import useSwitch from "hooks/useSwitch";

const [copyNotification, setCopyNotification] = useSwitch("");

const copy = (url: string) => {
  navigator.clipboard.writeText(url);
  setCopyNotification(url);
  setTimeout(() => setCopyNotification(""), 1000);
}

export {copy, copyNotification};