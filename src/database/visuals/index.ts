import { Category } from 'database/class';
import { colors } from './colors';
import { fonts } from './fonts';
import { icons } from './icons';
import { illustrations } from './illustrations';
import { images } from './images';

export const visuals = new Category({
  title: "Visuals",
  description: "Discover a curated selection of visual resources to enhance your design and development projects.",
  icon: "RiDesignPaletteLine",
  items: [
    colors,
    fonts,
    icons,
    illustrations,
    images
  ]
});