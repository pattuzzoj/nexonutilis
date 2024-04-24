import { Category } from "database/class";
import items from "./items.json";

export const images = new Category({
  title: "Images",
  description: "Discover a rich library of images ranging from stock photos to illustrations. Elevate your projects with high-quality visuals, perfect for web design, marketing materials, or any creative endeavor needing that visual spark.",
}, items);