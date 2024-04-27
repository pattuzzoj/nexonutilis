import { Category } from 'models/category';
import items from "./items.json";

export const lua = new Category({
  title: "Lua",
  description: "Lua is a powerful, efficient, lightweight, embeddable scripting language. It supports procedural programming, object-oriented programming, functional programming, data-driven programming, and data description.",
}, items);