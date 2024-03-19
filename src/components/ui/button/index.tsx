import { JSX, splitProps } from "solid-js";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
  const [inner, attrs] = splitProps(props, ["children"]);
  
  return <button {...attrs}>{inner.children}</button>;
}