import { Category } from 'models/category';
import items from "./items.json";

export const sqlite = new Category({
  title: "SQLite",
  description: "SQLite is an embedded, fast, self-contained, high-reliability relational database management system.",
}, items);