import { Category } from 'database/class';
import { css } from './css';
import { less } from './less';
import { sass } from './sass';

export const styling = new Category({
  title: "Stylization Languages",
  description: "Styling languages are used to define the visual appearance and layout of documents or elements within documents.",
}, [css, less, sass]);