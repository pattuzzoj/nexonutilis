import { Category } from 'models/category';
import items from "./items.json";

export const voice = new Category({
  title: "Voice Generator",
  description: "Explore a comprehensive list of voice generator tools and APIs for converting text into lifelike speech.",
}, items);