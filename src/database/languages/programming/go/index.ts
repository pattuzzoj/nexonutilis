import { Category } from 'models/category';
import items from "./items.json";

export const go = new Category({
  title: "Go",
  description: "Go is an open source programming language that makes it simple to build secure, scalable systems.",
}, items);