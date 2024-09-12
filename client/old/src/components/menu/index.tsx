import { For } from "solid-js";
import { useData } from "context";
import MenuItem from "./menuItems";
export default function Menu() {
  const {data} = useData();

  return (
    <div class="h-[75vh] w-full flex flex-col items-center">
      <div class="w-full flex flex-col gap-3 overflow-y-auto rounded-2xl p-2 bg-gray-300 dark:bg-zinc-900">
        <For each={data.categories}>
          {(item) => <MenuItem {...item} depth={2}/>}
        </For>
      </div>
    </div>
  );
}