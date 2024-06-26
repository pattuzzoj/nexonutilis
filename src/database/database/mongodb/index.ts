import { Category } from 'models/category';
import items from "./items.json";

export const mongodb = new Category({
  title: "MongoDB",
  description: "MongoDB is a powerful, open-source NoSQL database designed for scalability and high performance.",
}, items);