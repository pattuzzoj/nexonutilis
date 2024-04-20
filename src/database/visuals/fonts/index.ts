import { Category, setItems } from "../../class";
import items from "./items.json";

export const fonts = new Category({
  title: "Fonts",
  description: "Dive into a world of typography with our curated selection of fonts. Whether you're looking for classic serifs, sleek sans-serifs, or unique display fonts, find the right typeface to match the tone and style of your project.",
  items: setItems(items)
});