import { For, Show, createSignal } from "solid-js";
import { useData } from "context/DataContext";
import { iconList } from "components/ui/icon";

interface Item {
  title: string;
  description: string;
  url: string; 
}

interface Category extends Item {
	id: number;
	parent_category_id: number;
  type: "category" | "resource";
  icon: iconList;
  items: Array<Category | Item>;
}

function SearchBar() {
  const [list, setList] = createSignal<Array<{title: string, url: string, category: string}>>([]);
  const [value, setValue] = createSignal<string>('');
  const [data] = useData();

  function filterList(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    setList([]);

    if(input.value != ``) {
      data.routes.forEach(({title, url}: Category) => {
        if(url?.lastIndexOf("/") && title?.split(" ").some((value) => value.toLowerCase().startsWith(input.value.toLowerCase()))) {
          setList(items => [...items, {"title": title, "url": url, "category": data.routes.get(url.slice(0, url.indexOf("/", 1)))!.title.toLowerCase()}]);
        }
      });
    }
  }

  return (
    <div class="relative">
      <input
      class="peer w-full text-center bg-gray-300 focus:bg-gray-100 dark:bg-zinc-800 p-2 rounded-xl "
      type="text" onInput={filterList} value={value()} placeholder="Search Resources" />
      <Show when={list().length}>
        <ul
        class="w-full flex flex-col gap-1 absolute top-[110%] left-0 z-10 rounded-xl p-2 bg-gray-300 dark:bg-zinc-800 shadow-md shadow-black"
        onClick={(e) => {if(e.target.tagName == 'A') setValue(''); setList([]);}}
        >
          <For each={list()}>
            {({title, url, category}) => (
            <li>
              <a class="flex justify-between items-center rounded-xl p-1 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700" href={url}>{title}<span class="rounded-xl p-2 text-sm bg-gray-100 dark:bg-zinc-900">{category}</span></a>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}

export default SearchBar;