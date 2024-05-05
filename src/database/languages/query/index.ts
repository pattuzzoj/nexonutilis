import { Category } from 'models/category';
import { sql } from './sql';

export const query = new Category({
  title: "Query",
  description: "Query languages are used to retrieve, manipulate, and manage data stored in databases.",
  icon: "TbDatabaseSearch"
}, [sql]);