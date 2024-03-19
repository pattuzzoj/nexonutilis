import { JSXElement } from 'solid-js';

interface MainProps {
  children: JSXElement;
}

export default function Main(props: MainProps) {
  return (
    <main 
    class="
    flex justify-center items-center gap-8
    ">
      <div 
      class="
      w-full
      gap-y-3 sm:gap-y-3.5 md:gap-y-4 lg:gap-y-4.5 2xl:gap-y-5
      mx-1 sm:mx-1.5 md:mx-2 lg:mx-3
      ">
        {props.children}
      </div>
    </main>
  );
}