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

export const programming = new Category({
  title: "Programming Languages",
  description: "Collection of popular programming languages like C++, Python, Java, etc., for exploration and learning purposes.",
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