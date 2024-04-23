import { Category, setItems } from "database/class";
import items from "./items.json";

export const discord = new Category({
  title: "Discord",
  description: "Programming Discord: A vibrant community hub for coders to connect, collaborate, and innovate together. From sharing knowledge to troubleshooting code, all skill levels are welcome to join and contribute. Join us to be part of the excitement and growth in the world of programming!",
  items: setItems(items)
});