export class Item {
  title: string;
  description: string;
  url: string; 

  constructor({title, description, url}: Item) {
    this.title = title;
    this.description = description;
    this.url = url;
  }
}

export class Category {
  title: string;
  description: string;
  url?: string;
  type?: string;
  icon?: string;
  logo?: string;
  official_url?: string;
  roadmap_url?: string;
  items: Array<Category | Item>;

  constructor(
    {
      title,
      description,
      url,
      icon,
      logo,
      official_url,
      roadmap_url
    }: {
      title: string,
      description: string,
      url?: string,
      icon?: string,
      logo?: string,
      official_url?: string,
      roadmap_url?: string
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
    if(logo) this.logo = logo;
    if(official_url) this.official_url = official_url;
    if(roadmap_url) this.roadmap_url = roadmap_url;
  }
}