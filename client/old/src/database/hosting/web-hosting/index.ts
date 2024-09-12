import { Category } from 'models/category';
import items from "./items.json";

export const web = new Category({
  title: "Web Hosting",
  description: "Services optimized for hosting websites, providing tools and support for various CMS platforms and custom websites.",
}, items);