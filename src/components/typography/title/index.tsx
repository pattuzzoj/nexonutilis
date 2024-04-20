import { JSX, splitProps } from 'solid-js';

interface TitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
  as: "1" | "2" | "3" | "4" | "5" | "6";
}

export default function Title(props: TitleProps) {
  const [inner, attrs] = splitProps(props, ["as", "children"]);

  return {
    1: <h1 {...attrs}>{inner.children}</h1>,
    2: <h2 {...attrs}>{inner.children}</h2>,
    3: <h3 {...attrs}>{inner.children}</h3>,
    4: <h4 {...attrs}>{inner.children}</h4>,
    5: <h5 {...attrs}>{inner.children}</h5>,
    6: <h6 {...attrs}>{inner.children}</h6>,
  }[inner.as];
}