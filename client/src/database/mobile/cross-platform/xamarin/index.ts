import { Category } from 'models/category';
import items from "./items.json";

export const xamarin = new Category({
  title: "Xamarin",
  description: "Xamarin is a cross-platform mobile app development framework owned by Microsoft. It allows developers to build native mobile apps for Android, iOS, and Windows using C# and .NET. Xamarin enables code sharing across platforms, resulting in faster development cycles and reduced time to market for mobile applications.",
}, items);