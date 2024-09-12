import { Category } from 'models/category';
import items from "./items.json";

export const vue = new Category({
  title: "Vue",
  description: "A progressive JavaScript framework for building user interfaces, revered for its simplicity and flexibility, allowing developers to incrementally adopt its features into existing projects with ease."
}, items);