import { For } from "solid-js";
import Accordion from "components/accordion";
import { database } from "database";

export default function SideBar() {
  return (
    <div class="hidden w-fit md:flex flex-col justify-start items-center gap-2">
      <For each={database.items}>
        {item => <Accordion data={item}/>}
      </For>
    </div>
  );
}