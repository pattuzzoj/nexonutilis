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
      data.map.forEach((item: any) => {
        if("url" in item && item.url.lastIndexOf('/')) {
          if(item.type == "resource" && item.title.toLowerCase().startsWith(e.target.value.toLowerCase())) {
            setList(items => [...items, {"title": item.title, "url": item.url}]);
          }
        }
      })
    }
  }

  return (
    <div class="hidden md:block relative">
      <input class="peer w-full bg-gray-200 dark:bg-gray-500 p-2 rounded-lg" type="text" onInput={filterList} value={value()} placeholder="Search Resources" />
      <Show when={list().length}>
        <ul class="w-full flex flex-col gap-2 absolute top-[110%] left-0 z-10 rounded-lg p-2 bg-gray-500">
          <For each={list()}>
            {item => <li><a class="block rounded-lg p-2 hover:bg-gray-600" onClick={() => {setList([]); setValue('');}} href={item.url}>{item.title}</a></li>}
          </For>
        </ul>
      </Show>
    </div>
  );
}