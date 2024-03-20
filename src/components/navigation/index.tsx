import { useLocation } from "@solidjs/router";
import { For, Show } from "solid-js";
import Icon from "components/icon";
import { useData } from "context";

export default function Navigation() {
  const location = useLocation();
  const path = () => location.pathname;
  const {data} = useData();

  return (
    <span class="flex">
      <Show when={path()}>
        <span class="flex items-center gap-2">
          <a class="rounded p-2 text-[#2c2c54] dark:text-white hover:text-white hover:bg-[#2c2c54]" href="/">
            <Icon name="FiHome" class="size-6" />
          </a>
          <For each={data.currentItems}>
            {(item) => <><span class="font-bold text-xl">/</span><a class="rounded p-2 text-[#2c2c54] dark:text-white hover:text-white hover:bg-[#2c2c54]" href={item.url}>{item.title}</a></>}
          </For>
        </span>
      </Show>
    </span>
  )
}