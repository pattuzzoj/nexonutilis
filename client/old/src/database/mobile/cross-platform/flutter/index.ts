import { Category } from 'models/category';
import items from "./items.json";

export const flutter = new Category({
  title: "Flutter",
  description: "Flutter is an open-source UI software development kit created by Google. It allows developers to build natively compiled applications for mobile, web, and desktop from a single codebase. Flutter uses the Dart programming language and provides a rich set of customizable widgets and tools to create beautiful and responsive user interfaces.",
}, items);