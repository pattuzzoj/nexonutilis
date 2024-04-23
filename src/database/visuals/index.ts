import { Category } from 'database/class';
import { colors } from './colors';
import { fonts } from './fonts';
import { icons } from './icons';
import { illustrations } from './illustrations';
import { images } from './images';

export const visuals = new Category({
  title: "Visuals",
  description: "Enhance projects with visual elements like colors, fonts, icons, and illustrations.",
  icon: "RiDesignPaletteLine",
  items: [
    colors,
    fonts,
    icons,
    illustrations,
    images
  ]
});