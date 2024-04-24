import { Category } from "database/class";
import items from "./items.json";

export const sql = new Category({
  title: "SQL",
  description: "SQL is a structured query language used to interact with relational databases.",

}, items);