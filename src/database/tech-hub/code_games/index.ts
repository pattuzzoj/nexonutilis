import { Category } from 'database/class';
import items from "./items.json";

export const code_games: Category = new Category({
  title: "Code Games",
  description: "Code Games offers a diverse collection of interactive challenges and puzzles tailored for programming enthusiasts. Engage in strategic thinking, problem-solving, and algorithmic mastery while enjoying an immersive gaming experience designed to sharpen your coding skills.",
}, items);