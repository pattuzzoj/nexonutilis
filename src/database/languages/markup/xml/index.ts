import { Category } from "database/class";
import items from "./items.json";

export const xml = new Category({
  title: "XML",
  description: "XML is a markup language designed to store and transport data in a readable format for both humans and computers.",
}, items);