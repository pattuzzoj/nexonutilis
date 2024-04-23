import { Category, setItems } from "database/class";
import items from "./items.json";

export const cpp = new Category({
  title: "C++",
  description: "C++ is a general-purpose, compiled, object-oriented programming language. It is an extension of C that adds features such as classes, inheritance, and polymorphism, enabling the creation of more complex and well-organized programs. It is popular for developing high-performance systems, games, and embedded software.",
  url: "/cpp",
  items: setItems(items)
});