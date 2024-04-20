import { For, Show, createSignal } from "solid-js";
import { useData } from "context";

export default function Search() {
  const {data} = useData();
  const [value, setValue] = createSignal<string>('');
  const [list, setList] = createSignal<Array<{title: string, url: string}>>([]);

  function filterList(e: any) {
    setList([]);
    
    if(e.target.value != '') {
      setValue(e.target.value);
      data.routes.forEach((item: any) => {
        console.log(item);
        if("url" in item && item.url.lastIndexOf('/')) {
          if(item?.type == "resource" && item.title.toLowerCase().startsWith(e.target.value.toLowerCase())) {
            setList(items => [...items, {"title": item.title, "url": item.url}]);
          }
        }
      })
    }
  }

  return (
    <div class="relative">
      <input class="peer w-full bg-gray-300 focus:bg-gray-100 dark:bg-zinc-900 dark:focus:bg-zinc-700 p-2 rounded-xl" type="text" onInput={filterList} value={value()} placeholder="Search Resources" />
      <Show when={list().length}>
        <ul class="w-full flex flex-col gap-2 absolute top-[110%] left-0 z-10 rounded-xl p-2 bg-gray-300 dark:bg-zinc-800 shadow-md shadow-black">
          <For each={list()}>
            {item => <li><a class="block rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-zinc-700" onClick={() => {setList([]); setValue('');}} href={item.url}>{item.title}</a></li>}
          </For>
        </ul>
      </Show>
    </div>
  );
}