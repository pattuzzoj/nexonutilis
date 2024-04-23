import { Category, setItems } from "../../class";
import items from "./items.json";

export const unreal = new Category({
  title: "Unreal",
  description: "Delve into the world of Unreal Engine with a comprehensive suite of development resources. From the extensive documentation covering all aspects of the engine to the vibrant community forums, there's no shortage of support for Unreal developers. ",
  items: setItems(items)
});