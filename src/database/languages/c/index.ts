import { Category, setItems } from "../../class";
import items from "./items.json";

export const c = new Category({
  title: "C",
  description: "C is a general-purpose, imperative, compiled, and procedural programming language. It is famous for its efficiency, portability, and direct hardware control. C is the foundation for many modern programming languages.",
  items: setItems(items)
});