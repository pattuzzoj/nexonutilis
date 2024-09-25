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

    setValue(input.value);
  }

  function handleClick(e: any) {
    if(e?.target?.tagName == 'A') {
      setValue('');
      setList([]);
    }
  }

  return (
    <div class="relative">
      <input
      class="peer w-full text-center p-2 rounded-xl bg-primary focus:focus-color dark:focus:outline-blue-200 outline-2"
      type="text" onInput={filterList} value={value()} placeholder="Search Resources" />
      <Show when={list().length}>
        <ul
        class="w-full flex flex-col gap-1 absolute top-[110%] left-0 z-10 rounded-xl p-2 bg-primary shadow-md shadow-black"
        onClick={handleClick}
        >
          <For each={list()}>
            {({title, url, category}) => (
            <li>
              <a class="flex justify-between items-center rounded-xl p-1 text-sm hover:text-hover hover:bg-secondary" href={url}>{title}<span class="rounded-xl p-2 text-sm bg-accent">{category}</span></a>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}

export default SearchBar;