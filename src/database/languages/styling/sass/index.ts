import { Category, setItems } from "database/class";
import items from "./items.json";

export const sass = new Category({
  title: "SASS",
  description: "Sass (Syntactically Awesome Stylesheets) is a CSS preprocessor that helps developers write stylesheets more efficiently and organizedly.",
  items: setItems(items)
});