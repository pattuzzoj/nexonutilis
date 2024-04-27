import { Category } from 'models/category';
import items from "./items.json";

export const java = new Category({
  title: "Java",
  description: "Java is a versatile, object-oriented programming language known for its portability, performance, and security features. It is widely used for developing enterprise applications, mobile apps (Android), web servers, and more. Java's rich ecosystem, including the Java Virtual Machine (JVM), allows developers to write code once and run it on multiple platforms.",
}, items);