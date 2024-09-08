import { Category } from 'models/category';
import items from "./items.json";

export const preact = new Category({
  title: "Preact",
  description: "A lightweight alternative to React, offering similar functionality with a smaller footprint, ideal for performance-focused web applications."
}, items);