import { Category } from 'database/class';
import { mysql } from './mysql';
import { postgres } from './postgres';
import { mongodb } from './mongodb';

export const databases = new Category({
  title: "Database",
  description: "Resources for efficient data storage and manipulation, including MySQL and Postgres.",
  icon: "FiDatabase",
  items: [
    mongodb,
    mysql,
    postgres
  ]
});