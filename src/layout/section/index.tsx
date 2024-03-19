import { JSXElement } from 'solid-js';

interface SectionProps {
  children: JSXElement;
}

export default function Section(props: SectionProps) {
  return (
    <section class="
    flex flex-col
    gap-y-1.5 sm:gap-2 md:gap-y-2.5 lg:gap-y-3">
      {props.children}
    </section>
  );
}