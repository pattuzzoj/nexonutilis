import { techhub } from './tech-hub';
import { languages } from './languages';
import { development } from './development';
import { visuals } from './visuals';
import { ia } from "./ia"
import { community } from './community';
import { hosting } from './hosting/hosting';

export const database = {
  type: "categories",
  items: [
    techhub,
    languages,
    development,
    hosting,
    visuals,
    ia,
    community,
  ]
}