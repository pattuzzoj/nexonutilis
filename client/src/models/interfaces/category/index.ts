import { iconList } from "components/icon";
import { Item } from "../item";

export interface Category extends Item {
  type: "category" | "resource";
  icon: iconList;
  items: Array<Category | Item>;
}