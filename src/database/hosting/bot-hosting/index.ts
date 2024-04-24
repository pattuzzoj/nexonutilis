import { Category } from "database/class";
import items from "./items.json";

export const bot = new Category({
  title: "Bot Hosting",
  description: "Specialized hosting services designed for bots, ensuring they are online and responsive 24/7, often with specific support for Discord bots, Slack bots, etc.",
}, items);