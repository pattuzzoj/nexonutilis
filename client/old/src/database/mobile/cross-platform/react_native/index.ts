import { Category } from 'models/category';
import items from "./items.json";

export const react_native = new Category({
  title: "React Native",
  description: "React Native is an open-source framework developed by Facebook that enables developers to build mobile applications using JavaScript and React. It allows for the creation of truly native apps that are not only cross-platform (iOS and Android) but also have high performance that is nearly identical to native apps built using Objective-C, Swift, or Java.",
}, items);