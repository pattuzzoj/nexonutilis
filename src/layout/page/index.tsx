import { JSXElement, splitProps } from 'solid-js';
import MetaData from '../meta';
import Main from '../main';

interface PageProps {
  title: string;
  description: string;
  keywords: string;
  children: JSXElement;
}

export default function Page(props: PageProps) {
  const [meta, inner] = splitProps(props, ["title", "keywords", "description"]);

  return (
    <>
      {/* <MetaData {...meta} /> */}
      <Main>
        {inner.children}
      </Main>
    </>
  );
}