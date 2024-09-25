import { For } from "solid-js";
import { useData } from "context/DataContext";
import NavigationMenuItem from "./navigationMenuItem";

function NavigationMenu() {
  const [data] = useData();

  return (
    <div class="flex flex-col gap-1 p-2 rounded-2xl bg-primary">
      <For each={data.menu}>
        {(item) => <NavigationMenuItem {...item} depth={2}/>}
      </For>
    </div>
  )
}

export default NavigationMenu;