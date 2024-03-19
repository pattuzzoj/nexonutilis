import { JSX, splitProps } from 'solid-js';

interface TextProps {
  as?: "text" | "formatted" | "quote" | "blockquote";
  children: JSX.Element;
  cite?: string;
  class?: string;
}

export default function Text(props: TextProps) {
  const [inner, attrs] = splitProps(props, ["as", "children"]);

  return {
      "text": <p {...attrs}>{inner.children}</p>,
      "formatted": <pre {...attrs}>{inner.children}</pre>,
      "quote": <q {...attrs}>{inner.children}</q>,
      "blockquote": <blockquote {...attrs}>{inner.children}</blockquote>
  }[inner.as || "text"];
}