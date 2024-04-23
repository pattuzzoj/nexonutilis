import { Category, setItems } from "database/class";
import items from "./items.json";

export const csharp = new Category({
  title: "C#",
  description: "C# is a modern, object-oriented, strongly typed, general-purpose programming language developed by Microsoft. It is popular for developing Windows, web, and mobile applications, integrating well with the .NET platform.",
  url: "/csharp",
  items: setItems(items)
});