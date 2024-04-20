import { Category, setItems } from "../../class";
import items from "./items.json";

export const illustrations = new Category({
  title: "Illustrations",
  description: "Visual representation of a subject, created through drawing, painting, or digitally. Used to enhance content or convey ideas in media like books, magazines, ads, and websites.",
  items: setItems(items)
});