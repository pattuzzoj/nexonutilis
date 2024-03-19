import { JSX, createSignal, For } from 'solid-js';

interface Props extends JSX.HTMLAttributes<HTMLElement> {
  text: string,
  items?: Array<{text: string, href: string}>,
  "aria-label": string,
}

export default function Dropdown(props: Props) {
  const [active, setActive] = createSignal(false);
  const dropdownVisibility = () => active() ? "block" : "hidden";

  return (
  <div>
    <button aria-expanded={active()} onClick={() => setActive(!active())}>{props.text}</button>
    <nav aria-label={props["aria-label"]} class={`${dropdownVisibility()}`}>
      {props.items ? <For each={props.items}>{(item) => <a class="" href={item.href}>{item.text}</a>}</For> : props.children}
    </nav>
  </div>
  );
}