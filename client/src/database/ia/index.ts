import { Category } from 'models/category';
import { image } from './image';
import { text } from './text';
import { voice } from './voice';

export const ia = new Category({
  title: "IA",
  description: "Explore and develop AI solutions with resources such as image, text, and voice generators.",
  icon: "BsRobot"
}, [image, text, voice]);