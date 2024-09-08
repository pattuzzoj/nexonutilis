import { Category } from 'models/category';
import items from "./items.json";

export const courses: Category = new Category({
  title: "Courses",
  description: "Embark on a journey of continuous learning with our curated selection of online courses. Explore a variety of platforms offering in-depth programs on programming, web development, data science, and more!",
}, items);