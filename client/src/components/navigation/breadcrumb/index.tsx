import { For } from "solid-js";
import { useData } from "context/DataContext";
import Icon from "components/ui/icon";

function Breadcrumb() {
  const [data] = useData();

  return (
    <span class="max-md:hidden flex items-center gap-2">
      <a href="/">
        <Icon name="FiHome" class="w-full flex items-center size-10 p-2 rounded-xl hover:text-hover bg-primary hover:bg-hover active:bg-active hover:scale-95" />
      </a>
      <For each={data.path}>
        {(path, index) => (
          <>
            <span class="font-bold text-xl">/</span>
            <a class={`${(index() == data.path.length) && "text-accent bg-accent"} p-2 rounded-lg hover:text-hover bg-primary hover:bg-hover active:bg-active hover:scale-95`} href={path.url}>{path.title}</a>
          </>
        )}
      </For>
    </span>
  )
}

export default Breadcrumb;