import { Category } from "database/class";
import items from "./items.json";

export const swift = new Category({
  title: "Swift",
  description: "Swift is a general-purpose programming language that's approachable for newcomers and powerful for experts.",
}, items);