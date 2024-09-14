import { JSX, JSXElement } from 'solid-js';

interface MainProps extends JSX.HTMLAttributes<HTMLElement> {
  children: JSXElement;
}

function Main(props: MainProps) {
  return (
    <main class="h-[90vh] overflow-y-scroll flex justify-center items-start p-4 bg-gray-300 dark:bg-zinc-900 rounded-2xl">
      {props.children}
    </main>
  )
}

export default Main;