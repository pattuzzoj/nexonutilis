import { Category } from 'database/class';
import { mysql } from './mysql';
import { postgres } from './postgres';

export const databases = new Category({
  title: "Database",
  description: "Dive deep into the heart of data management with database technologies. Explore relational and non-relational databases, query languages, and data modeling techniques to store, retrieve, and manipulate data effectively in your applications.",
  icon: "FiDatabase",
  items: [
    mysql,
    postgres
  ]
});