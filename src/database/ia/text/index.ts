import { Category, setItems } from "database/class";
import items from "./items.json";

export const text = new Category({
  title: "Text Generator",
  description: "Explore AI-powered text generation tools and models.",
  items: setItems(items)
});