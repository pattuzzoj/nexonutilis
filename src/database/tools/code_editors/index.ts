import { Category } from 'database/class';
import items from "./items.json";

export const code_editors: Category = new Category({
  title: "Code Editors",
  description: "Code editors are lightweight yet powerful software tools designed for writing and editing code. They provide essential features such as syntax highlighting, code autocompletion, and customizable themes to enhance developers' productivity.",
}, items);