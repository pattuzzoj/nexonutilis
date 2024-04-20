import { Category } from 'database/class';
import { image } from './image';
import { text } from './text';
import { voice } from './voice';

export const ia = new Category({
  title: "IA",
  description: "Explore different types of AI applications and technologies.",
  icon: "BsRobot",
  items: [
    image,
    text,
    voice
  ]
});