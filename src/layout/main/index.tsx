import { JSXElement } from 'solid-js';

interface MainProps {
  children: JSXElement;
}

export default function Main(props: MainProps) {
  return (
    <main 
    class="
    h-[85vh] md:h-[90vh] w-full flex flex-col p-4 overflow-y-scroll
    ">
      {props.children}
    </main>
  );
}