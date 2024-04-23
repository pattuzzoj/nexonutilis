import { Category, setItems } from "database/class";
import items from "./items.json";

export const forums = new Category({
  title: "Forums",
  description: "Join dynamic programming forums where you can ask questions, seek advice, and engage in discussions with a diverse community of developers. Whether you're troubleshooting code issues or exploring new technologies, forums provide valuable support and camaraderie.",
  items: setItems(items)
});