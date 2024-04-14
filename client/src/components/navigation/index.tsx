import { For, Show } from "solid-js";
import Icon from "components/icon";
import { useData } from "context";

export default function Navigation() {
  const {data} = useData();
  
  return (
    <span class="w-4/5 overflow-hidden overflow-x-scroll text-nowrap flex items-center gap-2 text-sm md:text-base">
      <Show when={data.path.length > 0}>
        <a class="flex rounded p-2 hover:text-white hover:bg-gray-400" href="/">
          <Icon name="FiHome" class="size-6" />
        </a>
        <For each={data.path}>
          {(item) => <><span class="font-bold text-xl">/</span><a class="rounded p1 md:p-2 hover:text-white hover:bg-gray-400" href={item.url}>{item.title}</a></>}
        </For>
      </Show>
    </span>
  )
}