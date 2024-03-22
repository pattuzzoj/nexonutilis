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
        <span class="flex items-center gap-2 text-sm md:text-base">
          <a class="hidden md:flex rounded p-2 hover:text-white hover:bg-gray-400" href="/">
            <Icon name="FiHome" class="size-6" />
          </a>
          <For each={data.navigation}>
            {(item) => <><span class="font-bold text-xl">/ </span><a class="rounded p1 md:p-2 hover:text-white hover:bg-gray-400" href={item.url}>{item.title}</a></>}
          </For>
        </span>
      </Show>
    </span>
  )
}