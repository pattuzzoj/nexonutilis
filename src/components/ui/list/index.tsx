import { JSX, splitProps, Show, For } from 'solid-js';

interface Props extends JSX.HTMLAttributes<HTMLElement> {
  order: boolean;
  items?: Array<number | string>;
}

export default function List(props: Props) {
  const [inner, attrs] = splitProps(props, ["children"]);
  
  return (
    <Show when={attrs.order} fallback={(<ul {...attrs}>{attrs.items ? <For each={attrs.items}>{(item) => <li>{item}</li>}</For> : props.children}</ul>)}>
      <ol {...attrs}>
        {attrs.items ? <For each={attrs.items}>{(item) => <li>{item}</li>}</For> : props.children}
      </ol>
    </Show>
  );
}