import { Category } from 'database/class';
import { code_editors } from './code_editors';
import { ide } from './ide';

export const tools = new Category({
  title: "Tools",
  description: " From lightweight code editors to feature-rich integrated development environments (IDEs), these tools play a crucial role in the software development lifecycle, offering developers the flexibility and functionality needed to create high-quality applications across various programming languages and platforms.",
  icon: "AiOutlineCodeSandbox",
}, [code_editors, ide]);