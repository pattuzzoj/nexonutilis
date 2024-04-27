import { Category } from 'models/category';
import { colors } from './colors';
import { fonts } from './fonts';
import { icons } from './icons';
import { illustrations } from './illustrations';
import { images } from './images';

export const visuals = new Category({
  title: "Visuals",
  description: "Enhance projects with visual elements like colors, fonts, icons, and illustrations.",
  icon: "RiDesignPaletteLine",
}, [colors, fonts, icons, illustrations, images]);