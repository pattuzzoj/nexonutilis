import { For, Show, createSignal } from "solid-js";
import { useData } from "context";
import { Category } from "models/interfaces/category";

export default function Search() {
  const [list, setList] = createSignal<Array<{title: string, url: string}>>([]);
  const [value, setValue] = createSignal<string>('');
  const {data} = useData();

  function filterList(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    setList([]);
    
    if(input.value != '') {
      data.routes.forEach(({type, title, url}: Category) => {
        if(url.lastIndexOf('/')) {
          if(type == "resource" && title.toLowerCase().startsWith(input.value.toLowerCase())) {
            setList(items => [...items, {"title": title, "url": url}]);
          }
        }
      })
    }
  }

  return (
    <div class="relative">
      <input
      class="peer w-full bg-gray-300 focus:bg-gray-100 dark:bg-zinc-900 dark:focus:bg-zinc-700 p-2 rounded-xl"
      type="text" onInput={filterList} value={value()} placeholder="Search Resources" />
      <Show when={list().length}>
        <ul
        class="w-full flex flex-col gap-2 absolute top-[110%] left-0 z-10 rounded-xl p-2 bg-gray-300 dark:bg-zinc-800 shadow-md shadow-black"
        onClick={(e) => {if(e.target.tagName == 'A') setValue(''); setList([]);}}
        >
          <For each={list()}>
            {({title, url}) => <li><a class="block rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-zinc-700" href={url}>{title}</a></li>}
          </For>
        </ul>
      </Show>
    </div>
  );
}