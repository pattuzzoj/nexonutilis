import { Category } from 'database/class';
import { markup } from './markup';
import { styling } from './styling';
import { programming } from './programming';
import { query } from './query';

export const languages = new Category({
  title: "Languages",
  description: "Collection of popular programming languages like C++, Python, Java, etc., for exploration and learning purposes.",
  icon: "BsCode",
}, [markup, styling, programming, query]);