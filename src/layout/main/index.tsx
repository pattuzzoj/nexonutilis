import { JSX, JSXElement } from 'solid-js';

interface MainProps extends JSX.HTMLAttributes<HTMLElement> {
  children: JSXElement;
}

export default function Main(props: MainProps) {
  return (
    <main 
    class={`${props.class} h-[85vh] md:h-[90vh] w-full flex flex-col p-4 overflow-y-scroll`}>
      {props.children}
    </main>
  );
}