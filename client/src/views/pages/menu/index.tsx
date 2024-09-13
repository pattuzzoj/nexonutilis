import { Title } from "@solidjs/meta";
import Icon from "components/ui/icon";
import { useData } from "context/DataContext";
import { Switch, Match, For, Show } from "solid-js";

function Home() {
  const [data, setData] = useData();

  return (
    <>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 grid-rows-1 gap-4 transition-all duration-300">
        <For each={data.item?.items} fallback={<div class="w-full h-full flex justify-center items-center text-2xl">The category doesn't have any features yet.</div>}>
          {({title, description, url, icon}) => (
            <a class="
            group w-full flex flex-col justify-between gap-4 rounded-2xl p-4 
            bg-gray-200 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700
            shadow-sm hover:shadow-lg shadow-gray-300 dark:shadow-zinc-950
            hover:scale-95 transition-transform duration-300" href={url}>
              <span class="flex justify-between">
                <h3 class="text-xl">{title}</h3>
                <Icon name="RiArrowsArrowRightDoubleLine" class="invisible group-hover:visible size-7"/>
              </span>
              <p class="text-base font-medium font-sans line-clamp-3 opacity-90">{description}</p>
              <Show when={icon}>
                <span class="w-full flex flex-row-reverse">
                  <Icon name={icon} class="size-6 group-hover:animate-spin"/>
                </span>
              </Show>
            </a>
          )}
        </For>
      </div>
    </>
  );
}

export default Home;