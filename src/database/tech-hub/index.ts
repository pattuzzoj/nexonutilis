import { Category } from 'database/class';
import { courses } from './courses';
import { tutorials } from './tutorials';
import { training_code } from './training_code';

export const techhub = new Category({
  title: "Tech Hub",
  description: "Discover a central hub for technology enthusiasts and professionals alike.",
  icon: "TbLayoutDashboard",
  items: [
    tutorials,
    courses,
    training_code
  ]
});