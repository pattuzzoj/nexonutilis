import { Switch, Match, For, Show, createEffect, createSignal, } from "solid-js";
import Icon from "components/ui/icon";
import { useData } from "context/DataContext";
import CategoryCard from "components/ui/cards/categoryCard";
import ResourceCard from "components/ui/cards/resourceCard";
import Breadcrumb from "components/navigation/breadcrumb";
import { Item } from "types/interfaces";

function Menu() {
  const [data] = useData();
  const [title, setTitle] = createSignal(data.item.title);
  const [currentPage, setCurrentPage] = createSignal(1);
  const quantity = document.documentElement.clientWidth > 1200 ? 12 : 4;

  createEffect(() => {
    if(data.item.title != title()) {
      setCurrentPage(1);
      setTimeout(() => setTitle(data.item.title), 50);
    }
  })

  return (
    <div class="h-full flex flex-col justify-between gap-5">
      <span class="w-fit">
        <Breadcrumb />
      </span>
      <Switch>
        <Match when={data.item.type == "category"}>
          <div class="h-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-stretch content-start place-content-center place-items-stretch gap-4">
            <For each={data.item.items}>
              {(item) => <CategoryCard title={item.title} description={item.description} url={item.url} icon={(item as any)?.icon} />}
            </For>
          </div>
        </Match>
        <Match when={data.item.type == "resource"}>
          <div class="h-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-stretch content-start place-content-center place-items-stretch gap-4">
            <For each={(data.item.items as Array<Item>)?.slice(quantity * (currentPage() - 1), quantity * currentPage())}>
              {(item) => <ResourceCard {...item} category={data.item.type} />}
            </For>  
          </div>
        </Match>
      </Switch>
      <Show when={data.item.type == "resource" && data.item.items.length > quantity}>
        <div class="flex justify-center gap-2">
          <button class="rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700" onClick={() => setCurrentPage(currentPage() == 1 ? 1 : currentPage() - 1)}>
            <Icon name="RiArrowsArrowLeftSLine" class="text-xl" />
          </button>
          <For each={new Array(Math.ceil(data.item.items.length / quantity))}>
            {(_item, index) => (
              <button onClick={() => setCurrentPage(index() + 1)} class={`${currentPage() == index() + 1 ? "bg-gray-100 dark:bg-zinc-700" : ""} h-8 w-8 flex items-center justify-center rounded-xl p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700`}>{index() + 1}</button>
            )}
          </For>
          <button class="rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700" onClick={() => setCurrentPage(Math.ceil(data.item.items.length / quantity) == currentPage() ? Math.ceil(data.item.items.length / quantity) : currentPage() + 1)}>
            <Icon name="RiArrowsArrowRightSLine" class="text-xl" />
          </button>
        </div>
      </Show>
    </div>
  );
}

export default Menu;