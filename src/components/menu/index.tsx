import { For } from "solid-js";
import Accordion from "components/accordion";
import { database } from "database";

export default function Menu() {
  return (
    <div class="hidden md:flex h-[80%] flex-col justify-start items-center gap-4 overflow-y-auto p-2">
      <For each={database.items}>
        {item => <Accordion data={item}/>}
      </For>
    </div>
  );
}