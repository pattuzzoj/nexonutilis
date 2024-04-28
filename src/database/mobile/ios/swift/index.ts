import { Category } from 'models/category';
import items from "./items.json";

export const swift = new Category({
  title: "Swift",
  description: "Swift is a powerful and intuitive programming language developed by Apple for building iOS, macOS, watchOS, and tvOS apps. Introduced in 2014, Swift combines modern language features with safety, speed, and ease of use, making it ideal for both beginners and experienced developers.",
}, items);