import { Category } from "database/class";
import items from "./items.json";

export const postgres = new Category({
  title: "Postgres",
  description: "PostgreSQL is an open-source relational database management system known for its robustness and standards compliance, offering advanced features such as complex data types, advanced queries, and ACID transactions.",
}, items);