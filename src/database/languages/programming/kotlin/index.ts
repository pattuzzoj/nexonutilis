import { Category } from "database/class";
import items from "./items.json";

export const kotlin = new Category({
  title: "Kotlin",
  description: "Kotlin is a modern, statically typed programming language developed by JetBrains. It is fully interoperable with Java and is designed to be concise, expressive, and safe. Kotlin is widely used for Android app development, as well as for server-side development, web applications, and more.",
}, items);