import { For } from "solid-js";
import MenuItem from "./menuItems";
import { useData } from "context";
// import { database } from "database";

export default function Menu() {
  const {data} = useData();

  return (
    <div class="hidden md:flex h-[80%] flex-col justify-start items-center gap-4 overflow-y-auto p-2">
      <For each={data.data}>
        {(item: any) => <MenuItem {...item} depth={2}/>}
      </For>
    </div>
  );
}