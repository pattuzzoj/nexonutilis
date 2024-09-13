import { createEffect, For, Show } from "solid-js";
import { useData } from "context/DataContext";
import Icon from "components/ui/icon";

function Breadcrumb() {
  const {data} = useData();
  
  return (
    <span>
      <Show when={data?.path.length}>
        <a href="/">
          <Icon name="FiHome" class="size-6" />
        </a>
        <For each={data.path}>
          {(path) => (
            <>
              <span class="font-bold text-xl">/</span>
              <a class="" href={path.url}>{path.title}</a>
            </>
          )}
        </For>
      </Show>
    </span>
  )
}

export default Breadcrumb;