import { JSX } from 'solid-js';

interface Props extends JSX.DetailsHtmlAttributes<HTMLDetailsElement> {
  text: string;
}

export default function Accordion(props: Props) {
  return (
    <details title={props.title}>
      <summary>{props.text}</summary>
      <div>
        {props.children}
      </div>
    </details>
  );
}