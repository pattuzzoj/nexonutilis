import { Category, setItems } from "database/class";
import items from "./items.json";

export const python = new Category({
  title: "Python",
  description: "Python is a versatile, high-level programming language known for its simplicity and readability. It is widely used in various domains such as web development, data science, artificial intelligence, and more. Python's extensive standard library and large ecosystem of third-party packages make it a popular choice among developers.",
  items: setItems(items)
});