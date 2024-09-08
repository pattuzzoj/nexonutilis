import { Category } from 'models/category';
import { blogs } from './blogs';
import { forums } from './forums';
import { discord } from './discord';

export const community = new Category({
  title: "Community",
  description: "Platforms like blogs, forums, and Discord servers for collaboration and knowledge sharing among developers.",
  icon: "OcPerson3",
}, [blogs, forums, discord]);