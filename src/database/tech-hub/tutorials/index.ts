import { Category, setItems } from 'database/class';
import items from "./items.json";


export const tutorials: Category = new Category({
  title: "Tutorials",
  description: "Unleash your coding potential with our curated tutorials.",
  url: "/tutorials",
  items: setItems(items)
});
console.log(tutorials)