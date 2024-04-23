import { Category } from 'database/class';
import { typescript } from './typescript';
import { c } from './c';
import { cpp } from './cpp';
import { csharp } from './csharp';
import { go } from './go';
import { java } from './java';
import { javascript } from './javascript';
import { kotlin } from './kotlin';
import { lua } from './lua';
import { php } from './php';
import { python } from './python';
import { ruby } from './ruby';
import { rust } from './rust';
import { swift } from './swift';

export const languages = new Category({
  title: "Languages",
  description: "Collection of popular programming languages like C++, Python, Java, etc., for exploration and learning purposes.",
  icon: "BsCode",
  items: [
    c,
    cpp,
    csharp,
    kotlin,
    go,
    lua,
    java,
    javascript,
    php,
    python,
    ruby,
    rust,
    swift,
    typescript
  ]
});