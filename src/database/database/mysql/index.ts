import { Category } from "database/class";
import items from "./items.json";

export const mysql = new Category({
  title: "MySQL",
  description: "MySQL is an open-source relational database management system widely used for its reliability and performance, offering a variety of features including powerful SQL queries and data replication.",
}, items);