import { Category } from 'models/category';
import { css } from './css';
import { less } from './less';
import { sass } from './sass';

export const styling = new Category({
  title: "Stylization",
  description: "Styling languages are used to define the visual appearance and layout of documents or elements within documents.",
  icon: "RiDesignPaletteLine"
}, [css, less, sass]);