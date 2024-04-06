import courses from './courses.json';
import tutorials from './tutorials.json';
import coding_training from './coding_training.json';

export const techhub = {
  "type": "categories",
  "title": "Tech Hub",
  "description": "Discover a central hub for technology enthusiasts and professionals alike.",
  "icon": "TbLayoutDashboard",
  "items": [
    tutorials,
    courses,
    coding_training
  ],
  "url": "/tech-hub",
}