import { Category } from 'models/category';
import { c } from './c';
import { cpp } from './cpp';
import { csharp } from './csharp';
import { kotlin } from './kotlin';
import { go } from './go';
import { lua } from './lua';
import { java } from './java';
import { php } from './php';
import { javascript } from './javascript';
import { python } from './python';
import { ruby } from './ruby';
import { rust } from './rust';
import { swift } from './swift';
import { typescript } from './typescript';

export const programming = new Category({
  title: "Programming Languages",
  description: "Collection of popular programming languages like C++, Python, Java, etc., for exploration and learning purposes.",
  url: "/programming"
}, [c, cpp, csharp, kotlin, go, lua, java, php, javascript, python, ruby, rust, swift, typescript]);