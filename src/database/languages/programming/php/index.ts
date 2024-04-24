import { Category } from "database/class";
import items from "./items.json";

export const php = new Category({
  title: "PHP",
  description: "PHP is a server-side scripting language designed for web development. It is widely used for creating dynamic web pages and web applications. PHP offers powerful features for server-side programming, database integration, and web services. Despite its age, PHP continues to be a popular choice for web development due to its ease of use and extensive community support.",
}, items);