import { Category } from 'models/category';
import items from "./items.json";

export const blogs = new Category({
  title: "Blogs",
  description: "Dive into insightful programming blogs covering a myriad of topics, including tutorials, best practices, industry trends, and personal experiences. Stay updated with the latest developments and gain valuable insights from seasoned professionals and enthusiasts alike.",
}, items);