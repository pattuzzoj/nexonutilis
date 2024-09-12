import { JSX, JSXElement } from 'solid-js';

interface MainProps extends JSX.HTMLAttributes<HTMLElement> {
  children: JSXElement;
}

function Main(props: MainProps) {
  return (
    <main class="min-h-[90vh] flex justify-center items-center bg-gray-300 dark:bg-zinc-900 rounded-s-2xl">
      {props.children}
    </main>
  )
}

export default Main;