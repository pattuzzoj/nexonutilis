import { Category } from 'models/category';
import items from "./items.json";

export const solidjs = new Category({
  title: "Solid.js",
  description: "A declarative JavaScript library for building user interfaces, focused on reactivity and performance, aiming to be simple yet powerful."
}, items);