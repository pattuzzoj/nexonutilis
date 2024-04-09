import { For, Match, Show, Switch, createEffect, createSignal } from "solid-js";
import Icon from "components/icon";
import Main from "layout/main";
import useSwitch from "hooks/useSwitch";
import useFetch from "hooks/useFetch";


export default function Form() {
  const [type, setType] = useSwitch<string>("categories");
  const [_isOpen, _setIsOpen] = useSwitch<boolean>(false);
  const [categories] = useFetch<{success: boolean, message: string, error: string, data: any}>('GET','https://nexonutilis-server.vercel.app/categories');
  const [resources] = useFetch<{success: boolean, message: string, error: string, data: any}>('GET', 'https://nexonutilis-server.vercel.app/resources');
  const [info, setInfo] = createSignal<{
    id: number,
    type: string,
    title: string,
    description: string,
    url: string,
    icon: string,
    logo: string,
    official: boolean,
    roadmap: string,
    position: number,
    category_url: string
  }>()

  createEffect(() => console.log(categories(), resources()))

  const [list, setList] = createSignal([]);
  const [menuInfo, setMenuInfo] = useSwitch<boolean>(false);

  return (
    <Main>
      <div class="relative h-full">
        <span class="flex gap-4">
          <button class={`${type() == "categories" && "bg-gray-500"} p-2 rounded-lg hover:bg-gray-500 text-lg`} onClick={() => {setType("categories"); setList(categories()?.data)}}>Categories</button>
          <button class={`${type() == "resources" && "bg-gray-500"} p-2 rounded-lg hover:bg-gray-500 text-lg`} onClick={() => {setType("resources"); setList(resources()?.data)}}>Resources</button>
          <button>Add</button>
        </span>
        <Show when={menuInfo()}>
          <div class="absolute top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] z-10 flex">
            <div class="flex flex-col">
              <span>id: {info()?.id}</span>
              <span>type: {info()?.type}</span>
              <span>position: {info()?.position}</span>
              <span>icon: {info()?.icon}</span>
            </div>
            <div class="flex flex-col">
              <span>title: {info()?.title}</span>
              <span>description: {info()?.description}</span>
              <span>url: {info()?.url}</span>
              <span>logo: {info()?.logo}</span>
              <span>official: {info()?.official}</span>
              <span>roadmap: {info()?.roadmap}</span>
              <span>category_url: {info()?.category_url}</span>
            </div>
          </div>
        </Show>
        <table class="w-full">
          <Switch>
            <Match when={type() == "categories"}>
              <caption class="mb-4 font-semibold text-xl">Categories</caption>
            </Match>
            <Match when={type() == "resources"}>
              <caption class="mb-4 font-semibold text-xl">Resources</caption>
            </Match>
          </Switch>
          <thead>
            <tr>
              <th class="pb-2">ID</th>
              <th class="pb-2">Type</th>
              <th class="pb-2 text-start">Title</th>
              <th class="pb-2 text-start">URL</th>
              <th class="pb-2 text-start">Category URL</th>
              <th class="pb-2">Position</th>
              <th class="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <For each={list()}>
              {(item: any) => (
                <tr class="rounded-lg odd:bg-gray-500 h-10 align-middle">
                  <td class="text-center">{item.id}</td>
                  <td class="text-center">{item.type}</td>
                  <td class="text-start">{item.title}</td>
                  <td class="text-start">{item.url}</td>
                  <td class="text-start">{item.category_url}</td>
                  <td class="text-center">{item.position}</td>
                  <td>
                    <span class="flex justify-center gap-2">
                      <button class="text-lg" onClick={() => {setInfo(item); setMenuInfo(true)}}><Icon name="FiInfo"/></button>
                      <button class="text-lg"><Icon name="FiEdit"/></button>
                      <button class="text-lg"><Icon name="FiTrash"/></button>
                    </span>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </Main>
  );
}
