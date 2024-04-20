import { community } from './community';
import { development } from './development';
import { hosting } from './hosting/hosting';
import { ia } from "./ia"
import { languages } from './languages';
import { softwares } from "./softwares";
import { techhub } from './tech-hub';
import { visuals } from './visuals';

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
    community
  ]
}