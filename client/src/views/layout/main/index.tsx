import { JSX, JSXElement } from 'solid-js';

interface MainProps extends JSX.HTMLAttributes<HTMLElement> {
  children: JSXElement;
}

function Main(props: MainProps) {
  return (
    <main class="md:flex-1 md:h-[95vh] flex justify-center items-center md:rounded-l-2xl max-md:p-4 md:py-4 bg-secondary">
      {props.children}
    </main>
  )
}

export default Main;