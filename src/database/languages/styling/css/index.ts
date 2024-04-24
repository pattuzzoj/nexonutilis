import { Category } from "database/class";
import items from "./items.json";

export const css = new Category({
  title: "CSS",
  description: "CSS styles HTML elements, controlling their appearance, layout, and presentation.",
}, items);