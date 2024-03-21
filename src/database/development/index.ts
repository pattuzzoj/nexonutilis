import { frontend } from "./front-end";
import { backend } from "./back-end";
import { database } from "./database";
import { desktop } from "./desktop";
import { mobile } from "./mobile";
import { tools } from "./tools";

export const development = {
  "type": "categories",

  "title": "Development",
  "description": "Discover a variety of resources about development.",
  "items": [
    frontend,
    backend,
    mobile,
    desktop,
    database,
    tools,
  ],
  "url": "/development",
}