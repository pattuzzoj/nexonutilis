import { Category } from 'models/category';
import items from "./items.json";

export const html = new Category({
  title: "HTML",
  description: "HTML structures web content using elements and tags, defining its hierarchy and meaning.",
}, items);