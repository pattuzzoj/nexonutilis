import { Category } from 'models/category';
import { mysql } from './mysql';
import { postgres } from './postgres';
import { mongodb } from './mongodb';
import { sqlite } from './sqlite';

export const databases = new Category({
  title: "Database",
  description: "Resources for efficient data storage and manipulation, including MySQL and Postgres.",
  icon: "FiDatabase",
}, [mysql, postgres, mongodb, sqlite]);