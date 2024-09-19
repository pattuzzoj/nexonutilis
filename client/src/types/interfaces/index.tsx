import { iconList } from "components/ui/icon";

interface Item {
	id: number;
	category_id: number;
  title: string;
  description: string;
  url: string;
}

interface Category {
	id: number;
	parent_category_id: number;
  type: "category" | "resource";
	title: string;
  description: string;
  url: string; 
  icon: iconList;
  items: Array<Category | Item>;
}

export type {Item, Category};