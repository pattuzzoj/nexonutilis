import { For, Show } from "solid-js";
import { useData } from "context/DataContext";
import Icon from "components/ui/icon";

function Breadcrumb() {
  const [data] = useData();
  
  return (
    <span class="flex justify-between items-center gap-2">
      <Show when={data.path.length}>
        <a href="/">
          <Icon name="FiHome" class="w-full flex items-center size-10 p-2 rounded-xl dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 hover:scale-95" />
        </a>
        <For each={data.path}>
          {(path) => (
            <>
              <span class="font-bold text-xl">/</span>
              <a class="p-2 rounded-lg dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 hover:shadow-lg shadow-gray-300 dark:shadow-zinc-900 hover:scale-95" href={path.url}>{path.title}</a>
            </>
          )}
        </For>
      </Show>
    </span>
  )
}

export default Breadcrumb;