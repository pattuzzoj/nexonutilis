import { For, Match, Show, Switch, createEffect, createSignal } from "solid-js";
import Main from "layout/main";
import Icon from "components/icon";
import useFetch from "hooks/useFetch";

interface Category {
  id: number;
  type: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  logo: string;
  official: boolean;
  roadmap: string;
  position: number;
  category_url: string;
}

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  position: number;
  category_url: string;
}

async function fetchResource(method: string = 'GET', url: string, body?: any) {
  try {
    const options: any = {
      method,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors'
    }

    if(body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if(response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      throw new Error('Error: ' + response);
    }
  } catch(e) {
    throw new Error('Error: ' + e);
  }
}

export default function Form() {
  const baseURL = "https://nexonutilis-server.vercel.app";
  const [categories] = useFetch<Array<Category>>('GET', `${baseURL}/categories`);
  const [resources] = useFetch<Array<Resource>>('GET', `${baseURL}/resources`);
  const [type, setType] = createSignal<string>("categories");
  const [list, setList] = createSignal<Array<Category | Resource>>([]);
  const [infoMenu, setInfoMenu] = createSignal<boolean>(false);
  const [info, setInfo] = createSignal<Category | Resource>();
  const [editedInfo, setEditedInfo] = createSignal<Category | Resource>();

  createEffect(() => setList(categories() || []));

  function handleEditedInfo(e: any) {
    const { id: name, textContent: value } = e.target;
    
    setEditedInfo({ ...editedInfo() as any, [name]: value });
  }

  function post() {
    if(type() === "categories") {
      fetchResource('POST', `${baseURL}/category`, editedInfo());
    } else if(type() === 'resources') {
      fetchResource('POST', `${baseURL}/resource`, editedInfo());
    }
  }


  function del({id, url}: {id: number, url: string}) {
    if(type() === "categories") {
      fetchResource("DELETE", `${baseURL}/category`, {url});
    } else if(type() === "resources") {
      fetchResource("DELETE", `${baseURL}/resource`, {id});
    }
  }

  return (
    <Main class="relative">
      <span class="flex gap-4">
        <button class={`${type() == "categories" && "bg-gray-500"} rounded-lg p-2 hover:bg-gray-500 text-lg`} onClick={() => {setType("categories"); setList(categories() || [])}}>Categories</button>
        <button class={`${type() == "resources" && "bg-gray-500"} rounded-lg p-2 hover:bg-gray-500 text-lg`} onClick={() => {setType("resources"); setList(resources() || [])}}>Resources</button>
      </span>
      <button class="" onClick={() => {setInfo({} as any); setInfoMenu(true)}}>Add</button>
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
                    <button class="text-lg" onClick={() => {setInfo(item); setInfoMenu(true)}}><Icon name="FiEdit"/></button>
                    <button class="text-lg" onClick={() => del({id: item.id, url: item.url})}><Icon name="FiTrash"/></button>
                  </span>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      <Show when={infoMenu()}>
        <div class="
        absolute top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] z-10 container max-w-lg
        rounded-lg shadow-lg shadow-black bg-white dark:bg-gray-900 dark:text-white
        ">
          <div class="relative flex flex-col gap-2 p-6">
            <button class="absolute top-0 right-0 p-2" onClick={() => setInfoMenu(false)}><Icon name="FaSolidCircleXmark" class="size-5"/></button>
            <Show when={type() == "categories"}>
              <span class="flex gap-2">
                <strong class="w-1/4">Type:</strong>
                <span id="type" class="w-3/4" onInput={handleEditedInfo} contenteditable>{(info() as unknown as Category)?.type}</span>
              </span>
            </Show>
            <span class="flex gap-2">
              <strong class="w-1/4">Title:</strong>
              <span id="title" class="w-3/4" onInput={handleEditedInfo} contenteditable>{info()?.title}</span>
            </span>
            <span class="flex gap-2">
              <strong class="w-1/4">Description:</strong>
              <span id="description" class="w-3/4" onInput={handleEditedInfo} contenteditable>{info()?.title}</span>
            </span>
            <span class="flex gap-2">
              <strong class="w-1/4">URL:</strong>
              <span id="url" class="w-3/4" onInput={handleEditedInfo} contenteditable>{info()?.url}</span>
            </span>
            <Show when={type() == "categories"}>
              <span class="flex gap-2">
                <strong class="w-1/4">Icon:</strong>
                <span id="icon" class="w-3/4" onInput={handleEditedInfo} contenteditable>{(info() as unknown as Category)?.icon}</span>
              </span>
              <span class="flex gap-2">
                <strong class="w-1/4">Logo:</strong>
                <span id="logo" class="w-3/4" onInput={handleEditedInfo} contenteditable>{(info() as unknown as Category)?.logo}</span>
              </span>
              <span class="flex gap-2">
                <strong class="w-1/4">Official:</strong>
                <span id="official" class="w-3/4" onInput={handleEditedInfo} contenteditable>{(info() as unknown as Category)?.official}</span>
              </span>
              <span class="flex gap-2">
                <strong class="w-1/4">Roadmap:</strong>
                <span id="roadmap" class="w-3/4" onInput={handleEditedInfo} contenteditable>{(info() as unknown as Category)?.roadmap}</span>
              </span>
            </Show>
            <span class="flex gap-2">
              <strong class="w-1/4">Position:</strong>
              <span id="position" class="w-3/4" onInput={handleEditedInfo} contenteditable>{info()?.position}</span>
            </span>
            <span class="flex gap-2">
              <strong class="w-1/4">Category URL:</strong>
              <span id="category_url" class="w-3/4" onInput={handleEditedInfo} contenteditable>{info()?.category_url}</span>
            </span>
            <button class="rounded-lg p-2 bg-white text-black text-center font-medium" onClick={post}>Save</button>
          </div>
        </div>
      </Show>
    </Main>
  );
}