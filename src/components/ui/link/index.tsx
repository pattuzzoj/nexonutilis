import { JSX, splitProps } from "solid-js";

interface LinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function Link(props: LinkProps) {
  const [inner, attrs] = splitProps(props, ["children"]);
  
  return <a {...attrs}>{inner.children}</a>;
}