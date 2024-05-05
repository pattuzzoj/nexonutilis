import { Category } from 'models/category';
import { frontend } from './frontend';

export const web = new Category({
  title: "Web",
  description: "Explore tutorials that cover the essentials of developing applications for mobile devices. Learn to navigate the diverse ecosystem, understand user interface best practices, and implement functionalities optimized for smartphones and tablets.",
  icon: "TbWorldCode",
}, [frontend]);