import { Category, setItems } from "database/class";
import items from "./items.json";

export const rust = new Category({
  title: "Rust",
  description: "Rust is a modern, systems programming language designed for safety, speed, and concurrency. It offers memory safety without garbage collection and provides powerful abstractions for low-level programming tasks. Rust is often used for building performance-critical software, such as operating systems, game engines, and web servers, where reliability and efficiency are paramount.",
  items: setItems(items)
});