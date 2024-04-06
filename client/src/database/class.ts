export class Item {
  title: string;
  description: string;
  url: string;

  constructor(
    title: string,
    description: string,
    url: string
  ) {
    this.title = title;
    this.description = description;
    this.url = url;
  }
}

export class Menu extends Item {
  type: string;
  items: Array<Category | Resource | Item>;

  constructor(
    type: string,
    title: string,
    description: string,
    url: string
  ) {
    super(title, description, url);
    this.type = type;
    this.items = [];
  }

  static addItems(menu: Menu, items: Array<Category | Resource | Item>) {
    items.forEach(item => menu.items.push(item));
  }
}

export class Category extends Menu {
  icon?: string;

  constructor(
    title: string,
    description: string,
    url: string,
    icon?: string
  ) {
    super("categories",  title,  description,  url);
    this.icon = icon;
  }
}

export class Resource extends Menu {
  mode: string;
  logo?: string;
  official?: string;
  roadmap?: string;

  constructor(
    title: string,
    description: string,
    url: string,
    mode: string,
    logo?: string,
    official?: string,
    roadmap?: string
  ) {
    super("resources",  title,  description,  url);
    this.mode = mode;
    this.logo = logo;
    this.official = official;
    this.roadmap = roadmap;
  }
}