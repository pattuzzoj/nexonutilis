import { JSX, JSXElement } from 'solid-js';

interface MainProps extends JSX.HTMLAttributes<HTMLElement> {
  children: JSXElement;
}

function Main(props: MainProps) {
  return (
    <main class="md:h-[90vh] flex justify-center items-start p-4 md:px-6 bg-slate-300 dark:bg-zinc-900 md:rounded-l-2xl">
      {props.children}
    </main>
  )
}

export default Main;