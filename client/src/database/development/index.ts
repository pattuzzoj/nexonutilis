import { database } from './database';
import { frontend } from './front-end';
import { backend } from "./back-end";
// import { desktop } from "./desktop";
// import { mobile } from "./mobile";
import { tools } from "./tools";

export const development = {
  "type": "categories",
  "title": "Development",
  "description": "Discover a variety of resources about development.",
  "icon": "FiActivity",
  "items": [
    frontend,
    backend,
    database,
    tools,
  ],
  "url": "/development",
}