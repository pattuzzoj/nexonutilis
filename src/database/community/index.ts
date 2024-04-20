import { Category } from 'database/class';
import { blogs } from './blogs';
import { forums } from './forums';

export const community = new Category({
  title: "Community",
  description: "Explore vibrant developer communities where you can connect, collaborate, and learn from fellow programmers worldwide.",
  url: "/community",
  icon: "OcPerson3",
  items: [
    blogs,
    forums
  ]
});