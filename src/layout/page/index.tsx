import { JSXElement } from 'solid-js';
import Main from '../main';

interface PageProps {
  children: JSXElement;
}

export default function Page(props: PageProps) {
  return (
    <Main>
      {props.children}
    </Main>
  );
}