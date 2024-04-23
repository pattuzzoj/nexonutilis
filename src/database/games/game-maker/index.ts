import { Category, setItems } from "../../class";
import items from "./items.json";

export const gameMaker = new Category({
  title: "Game Maker",
  description: "GameMaker is a powerful game development engine that offers an accessible and versatile approach to creating both 2D and even some 3D games.",
  items: setItems(items)
});