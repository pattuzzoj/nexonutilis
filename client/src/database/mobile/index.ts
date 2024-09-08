import { Category } from 'models/category';
import { android } from './android';
import { ios } from './ios';
import { cross_platform } from './cross-platform';

export const mobile = new Category({
  title: "Mobile",
  description: "Explore tutorials that cover the essentials of developing applications for mobile devices. Learn to navigate the diverse ecosystem, understand user interface best practices, and implement functionalities optimized for smartphones and tablets.",
  icon: "AiOutlineMobile",
}, [android, ios, cross_platform]);