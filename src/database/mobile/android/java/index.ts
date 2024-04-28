import { Category } from 'models/category';
import items from "./items.json";

export const java = new Category({
  title: "Java",
  description: "Java Mobile development primarily refers to Android app development, where Java is the primary programming language used for creating mobile applications. Android Studio, the official IDE for Android development, provides a robust set of tools and libraries for building feature-rich and scalable Android apps using Java."
}, items);