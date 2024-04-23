import { Category } from 'database/class';
import { sql } from './sql';

export const query = new Category({
  title: "Query Languages",
  description: "Query languages are used to retrieve, manipulate, and manage data stored in databases.",
  items: [
    sql
  ]
});