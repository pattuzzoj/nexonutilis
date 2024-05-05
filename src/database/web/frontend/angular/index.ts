import { Category } from 'models/category';
import items from "./items.json";

export const angular = new Category({
  title: "Angular",
  description: "A robust front-end framework developed by Google, known for its comprehensive features and dependency injection system."
}, items);