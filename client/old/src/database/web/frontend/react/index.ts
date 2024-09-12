import { Category } from 'models/category';
import items from "./items.json";

export const react = new Category({
  title: "React",
  description: "A popular JavaScript library for building user interfaces, maintained by Facebook, characterized by its component-based architecture and virtual DOM rendering."
}, items);