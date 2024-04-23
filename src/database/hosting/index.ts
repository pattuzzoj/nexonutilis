import { Category } from 'database/class';
import { bot } from './bot-hosting';
import { web } from './web-hosting';

export const hosting = new Category({
  title: "Hosting",
  description: "Explore and develop AI solutions with resources such as image, text, and voice generators.",
  icon: "AiOutlineCloudServer",
  items: [
    bot,
    web
  ]
});