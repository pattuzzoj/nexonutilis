import { Category } from "database/class";
import items from "./items.json";

export const colors = new Category({
  title: "Colors",
  description: "Explore a vast collection of color schemes, palettes, and tools to enhance the aesthetic appeal of your projects. From vibrant hues to subtle shades, find the perfect color combinations to convey the right mood and message.",
}, items);