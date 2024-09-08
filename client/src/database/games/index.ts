import { Category } from 'models/category';
import { roblox } from './roblox';
import { unity } from './unity';
import { unreal } from './unreal';
import { gameMaker } from './game-maker';

export const games = new Category({
  title: "Game Development",
  description: "Tools and resources for creating interactive experiences, spanning platforms like Unity and Unreal.",
  icon: "IoGameControllerOutline",
}, [roblox, unity, unreal, gameMaker]);