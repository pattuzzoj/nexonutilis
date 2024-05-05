import { Category } from 'models/category';
import { html } from './html';
import { xml } from './xml';

export const markup = new Category({
  title: "Markup",
  description: "Markup languages are used to annotate text with additional information to define its structure and presentation.",
  icon: "BsCodeSlash"
}, [html, xml]);