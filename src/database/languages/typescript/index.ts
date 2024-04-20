import { Category, setItems } from "../../class";
import items from "./items.json";

export const typescript = new Category({
  title: "TypeScript",
  description: "TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. It brings static typing to JavaScript, enabling developers to catch errors early and write more maintainable code.",
  items: setItems(items)
});