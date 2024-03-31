import { techhub } from './tech-hub';
import { languages } from './languages';
import { development } from './development';
import { hosting } from './hosting/hosting';
import { visuals } from './visuals';
import { ia } from "./ia"
import { softwares } from "./softwares";
import { community } from './community';

export const database = {
  type: "categories",
  items: [
    techhub,
    languages,
    development,
    hosting,
    visuals,
    ia,
    softwares,
    community,
  ]
}