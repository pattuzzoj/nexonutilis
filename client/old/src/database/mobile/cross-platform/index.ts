import { Category } from 'models/category';
import { react_native } from './react_native';
import { flutter } from './flutter';
import { xamarin } from './xamarin';

export const cross_platform = new Category({
  title: "Cross Platform",
  description: "Gain insights through tutorials on building applications that operate across multiple operating systems using a single codebase. Learn about frameworks like Flutter, React Native, and Xamarin, focusing on their setup, UI development, and performance optimization.",
  icon: "BsBoxes"
}, [flutter, react_native, xamarin]);