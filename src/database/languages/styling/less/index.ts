import { Category } from "database/class";
import items from "./items.json";

export const less = new Category({
  title: "Less",
  description: "Less is a dynamic CSS preprocessor that extends CSS functionality with features such as variables, mixins, operations, and functions.",
}, items);