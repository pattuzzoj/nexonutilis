import { iconList } from "components/icon";
import { Item } from "models/interfaces/item";

export class Category implements Item {
  title: string;
  description: string;
  url: string;
  type: string;
  icon?: iconList;
  items: Array<Category | Item>;

  constructor(
    {
      title,
      description,
      url,
      icon,
    }: {
      title: string,
      description: string,
      url?: string,
      icon?: iconList,
    },
    items: Array<Category | Item>) {
    this.title = title;
    this.description = description;
    this.url = url || '/' + title.toLowerCase().replaceAll(' ', '-');

    if(items[0] instanceof Category) {
      this.type = "category";
    } else {
      this.type = "resource";
    }

    this.items = items;

    if(icon) this.icon = icon;
  }
}