import { Category, setItems } from "../../class";
import items from "./items.json";

export const ruby = new Category({
  title: "Ruby",
  description: "Ruby is a general-purpose, interpreted, object-oriented programming language known for its simple and readable syntax. It is popular for full-stack web development, especially with the Ruby on Rails framework. It is also used for scripting, text processing, and task automation.",
  items: setItems(items)
});