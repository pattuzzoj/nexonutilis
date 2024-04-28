import { Category } from 'models/category';
import { swift } from './swift';

export const ios = new Category({
  title: "IOS",
  description: "Dive into tutorials for developing iOS applications using Swift or Objective-C. Learn about the tools and features of Xcode, the nuances of iOS user interface design, and how to comply with Apple's app store guidelines.",
  icon: "AiOutlineApple"
}, [swift]);