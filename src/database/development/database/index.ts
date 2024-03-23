import mysql from "./mysql.json";
import postgresql from "./postgresql.json";

export const data = {
  "type": "categories",
  "title": "Database",
  "description": "Dive deep into the heart of data management with database technologies. Explore relational and non-relational databases, query languages, and data modeling techniques to store, retrieve, and manipulate data effectively in your applications.",
  "icon": "FiDatabase",
  "items": [
    mysql,
    postgresql
  ],
  "url": "/development/database",
}