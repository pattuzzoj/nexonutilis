import { Category } from 'models/category';
import items from "./items.json";

export const ide: Category = new Category({
  title: "IDEs",
  description: "Integrated Development Environments (IDEs) are comprehensive software applications that provide a complete set of tools for software development.",
}, items);