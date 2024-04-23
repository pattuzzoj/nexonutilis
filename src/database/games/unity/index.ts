import { Category, setItems } from "database/class";
import items from "./items.json";

export const unity = new Category({
  title: "Unity",
  description: "Explore Unity Learn for interactive tutorials and courses, dive into the Scripting API Documentation for in-depth reference material, and browse the Asset Store for ready-made assets and plugins. Engage with the Unity community on forums and stay inspired by the official YouTube channel.",
  items: setItems(items)
});