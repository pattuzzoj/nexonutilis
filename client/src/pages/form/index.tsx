import { For, Match, Show, Switch, createEffect, createSignal } from "solid-js";
import Icon from "components/icon";
import Main from "layout/main";
import useSwitch from "hooks/useSwitch";
import useFetch from "hooks/useFetch";


export default function Form() {
  const [type, setType] = useSwitch<string>("categories");
  const [_isOpen, _setIsOpen] = useSwitch<boolean>(false);
  const [categories] = useFetch<{success: boolean, message: string, error: string, data: any}>('DELETE','https://nexonutilis-server.vercel.app/category', {url: '/safassafsaf'});
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

  createEffect(() => console.log(categories()))














  const [list, setList] = createSignal([]);
  const [menuInfo, setMenuInfo] = useSwitch<boolean>(false);

  const lista = [
    {
        id: 1,
        type: "type1",
        title: "Title 1",
        description: "Description 1",
        url: "https://example.com/1",
        icon: "icon1.png",
        logo: "logo1.png",
        official: true,
        roadmap: "Roadmap 1",
        position: 1,
        category_url: "https://example.com/category1"
    },
    {
        id: 2,
        type: "type2",
        title: "Title 2",
        description: "Description 2",
        url: "https://example.com/2",
        icon: "icon2.png",
        logo: "logo2.png",
        official: false,
        roadmap: "Roadmap 2",
        position: 2,
        category_url: "https://example.com/category2"
    },
    {
        id: 3,
        type: "type3",
        title: "Title 3",
        description: "Description 3",
        url: "https://example.com/3",
        icon: "icon3.png",
        logo: "logo3.png",
        official: true,
        roadmap: "Roadmap 3",
        position: 3,
        category_url: "https://example.com/category3"
    },
    {
        id: 4,
        type: "type4",
        title: "Title 4",
        description: "Description 4",
        url: "https://example.com/4",
        icon: "icon4.png",
        logo: "logo4.png",
        official: false,
        roadmap: "Roadmap 4",
        position: 4,
        category_url: "https://example.com/category4"
    },
    {
        id: 5,
        type: "type5",
        title: "Title 5",
        description: "Description 5",
        url: "https://example.com/5",
        icon: "icon5.png",
        logo: "logo5.png",
        official: true,
        roadmap: "Roadmap 5",
        position: 5,
        category_url: "https://example.com/category5"
    }
  ];
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
            <For each={lista}>
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
