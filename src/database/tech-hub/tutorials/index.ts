import { Category } from 'models/category';
import items from "./items.json";

export const tutorials: Category = new Category({
  title: "Tutorials",
  description: "Unleash your coding potential with our curated tutorials.",
}, items);