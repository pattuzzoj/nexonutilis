import { Category } from 'models/category';
import items from "./items.json";

export const svelte = new Category({
  title: "Svelte",
  description: "A radical approach to building web applications, where the framework shifts much of the work to compile time, resulting in highly optimized and efficient code."
}, items);