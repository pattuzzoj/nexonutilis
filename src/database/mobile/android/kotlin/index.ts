import { Category } from 'models/category';
import items from "./items.json";

export const kotlin = new Category({
  title: "Kotlin",
  description: "Kotlin is a statically typed programming language that runs on the Java Virtual Machine (JVM) and also compiles to JavaScript. Developed by JetBrains, Kotlin is designed to be fully interoperable with Java, allowing developers to use both languages within the same project."
}, items);