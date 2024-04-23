import { Category, setItems } from "database/class";
import items from "./items.json";

export const javascript = new Category({
  title: "JavaScript",
  description: "JavaScript is a versatile programming language used for creating interactive websites, web applications, and server-side development. It is the backbone of modern web development, allowing developers to add dynamic behavior to web pages.",
  items: setItems(items)
});