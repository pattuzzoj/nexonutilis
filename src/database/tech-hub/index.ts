import { Category } from 'database/class';
import { courses } from './courses';
import { tutorials } from './tutorials';
import { training_code } from './training_code';
import { code_games } from './code_games';

export const techhub = new Category({
  title: "Tech Hub",
  description: "Central resource for developers, providing tutorials, courses, and training code across various tech fields.",
  icon: "TbLayoutDashboard",
}, [courses, tutorials, training_code, code_games]);