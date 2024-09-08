import { Category } from 'models/category';
import items from "./items.json";

export const image = new Category({
  title: "Image Generator",
  description: "Discover tools and platforms for generating images using artificial intelligence."
}, items);