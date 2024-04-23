import { Category } from 'database/class';
import { blogs } from './blogs';
import { forums } from './forums';
import { discord } from './discord';

export const community = new Category({
  title: "Community",
  description: "Platforms like blogs, forums, and Discord servers for collaboration and knowledge sharing among developers.",
  url: "/community",
  icon: "OcPerson3",
  items: [
    blogs,
    forums,
    discord
  ]
});