import { For, Match, Show, Switch, createEffect, createSignal } from "solid-js";
import Main from "layout/main";
import Icon from "components/icon";
import Title from "components/typography/title";
import useFetch from "hooks/useFetch";

interface Category {
  id: number;
  parent_category_id: number;
  type: string;
  title: string;
  description: string;
  url: string;
  index: number;
  icon: string;
  logo: string;
  official_url: string;
  roadmap_url: string;
  items: Array<Category | Resource>;
}

interface Resource {
  id: number;
  category_id: number;
  title: string;
  description: string;
  url: string;
  index: number;
}

export default function Form() {
  const [categories, {refetch: refetchCategories}] = useFetch<Array<Category>>('GET', `/category`);
  const [resources, {refetch: refetchResources}] = useFetch<Array<Resource>>('GET', `/resource`);
  const [type, setType] = createSignal<string>("category");
  const [list, setList] = createSignal<Array<Category | Resource>>([]);
  const [typeMenu, setTypeMenu] = createSignal<"create" | "edit" | "view">();
  const [menu, setMenu] = createSignal<boolean>(false);
  const [data, setData] = createSignal<Category | Resource>();
  const [editedData, setEditedData] = createSignal<Category | Resource>();
  let initialValue: Category;

  createEffect(() => {
    if(type() == "category") {
      setList(categories() || []);
    } else if((type() == "resource")) {
      setList(resources() || []);
    } else {
      setList([]);
    }
  })

  createEffect(() => setList(categories() || []));

  function handleEditedData(e: any) {
    const { name, value } = e.target;
    setEditedData({ ...editedData() as any, [name]: value });
  }

  function post() {
    if(type() == "category") {
      useFetch('POST', `/category`, editedData());
      setTimeout(refetchCategories, 500)
    } else {
      useFetch('POST', `/resource`, editedData());
      setTimeout(refetchResources, 500);
    }

    console.log(editedData());
    
    setEditedData({} as any);
  }

  function update(id: number) {
    if(type() == "category") {
      useFetch('PUT', `/category/${id}`, editedData());
      setTimeout(refetchCategories, 500)
    } else {
      useFetch('PUT', `/resource/${id}`, editedData());
      setTimeout(refetchResources, 500);
    }

    setEditedData({} as any);
  }

  function del(id: number) {
    if(type() == "category") {
      useFetch("DELETE", `/category/${id}`);
      setTimeout(refetchCategories, 500)
    } else {
      useFetch("DELETE", `/resource/${id}`);
      setTimeout(refetchResources, 500);
    }
  }

  return (
    <Main class="relative">
      <span class="flex gap-4">
        <button class={`${type() == "category" && "bg-gray-500"} rounded-lg p-2 hover:bg-gray-500 text-lg`} onClick={() => {setType("category"); setList(categories() || [])}}>Categories</button>
        <button class={`${type() == "resource" && "bg-gray-500"} rounded-lg p-2 hover:bg-gray-500 text-lg`} onClick={() => {setType("resource"); setList(resources() || [])}}>Resources</button>
      </span>
      <button class="text-lg" onClick={() => {setData({} as any); setTypeMenu("create"); setMenu(true);}}>Add</button>
      <div class="w-full">
        <Switch>
          <Match when={type() == "category"}>
            <Title as="3" class="text-start mb-4 font-semibold text-xl">Categories</Title>
          </Match>
          <Match when={type() == "resource"}>
            <Title as="3" class="text-start mb-4 font-semibold text-xl">Resources</Title>
          </Match>
        </Switch>
        <div class="border rounded-lg">
          <Switch>
            <Match when={type() == "category"}>
              <div>
                <span class="flex justify-around gap-4 py-2 px-1">
                  <span class="w-1/12 text-center">ID</span>
                  <span class="w-1/12 text-center">Parent ID</span>
                  <span class="w-1/12 text-center">Type</span>
                  <span class="w-2/12 text-start">Title</span>
                  <span class="w-6/12 text-start">Description</span>
                  <span class="w-3/12 text-start">URL</span>
                  <span class="w-3/12 text-start">Icon</span>
                  <span class="w-1/12 text-center">Index</span>
                  <span class="w-1/12 text-center">Actions</span>
                </span>
              </div>
              <For each={list() as Array<Category>}>
                {(item) => (
                  <span class="flex justify-around items-center gap-4 border-t-[1px] even:bg-gray-500 py-2 px-1">
                    <span class="w-1/12 text-center">{item.id}</span>
                    <span class="w-1/12 text-center">{item.parent_category_id}</span>
                    <span class="w-1/12 text-center">{item.type}</span>
                    <span class="w-2/12 text-start">{item.title}</span>
                    <span class="w-6/12 text-start line-clamp-1">{item.description}</span>
                    <span class="w-3/12 text-start">{item.url}</span>
                    <span class="w-3/12 text-start">{item.icon}</span>
                    <span class="w-1/12 text-center">{item.index}</span>
                    <span class="w-1/12 flex justify-center gap-2">
                      <button class="text-lg" onClick={() => {setData({...initialValue, parent_category_id: item.id}); setTypeMenu("create"); setMenu(true);}}><Icon name="IoAddCircleOutline"/></button>
                      <button class="text-lg" onClick={() => {setData(item); setTypeMenu("edit"); setMenu(true);}}><Icon name="FiEdit"/></button>
                      <button class="text-lg" onClick={() => del(item.id)}><Icon name="FiTrash"/></button>
                    </span>
                  </span>
                )}
              </For>
            </Match>
            <Match when={type() == "resource"}>
              <div>
                <span class="flex justify-around gap-4 py-2 px-1">
                  <span class="w-1/12 text-center">ID</span>
                  <span class="w-1/12 text-center">Category ID</span>
                  <span class="w-2/12 text-start">Title</span>
                  <span class="w-6/12 text-start">Description</span>
                  <span class="w-3/12 text-start">URL</span>
                  <span class="w-1/12 text-center">Index</span>
                  <span class="w-1/12 text-center">Actions</span>
                </span>
              </div>
              <For each={list() as Array<Resource>}>
                {(item) => (
                  <span class="flex justify-around items-center gap-4 border-t-[1px] even:bg-gray-500 py-2 px-1">
                    <span class="w-1/12 text-center">{item.id}</span>
                    <span class="w-1/12 text-center">{item.category_id}</span>
                    <span class="w-2/12 text-start">{item.title}</span>
                    <span class="w-6/12 text-start line-clamp-1">{item.description}</span>
                    <span class="w-3/12 text-start">{item.url}</span>
                    <span class="w-1/12 text-center">{item.index}</span>
                    <span class="w-1/12 flex justify-center gap-2">
                      <button class="text-lg" onClick={() => {setData(item); setTypeMenu("edit"); setMenu(true);}}><Icon name="FiEdit"/></button>
                      <button class="text-lg" onClick={() => del(item.id)}><Icon name="FiTrash"/></button>
                    </span>
                  </span>
                )}
              </For>
            </Match>
          </Switch>
        </div>
      </div>
      <Show when={menu()}>
        <div class="
        absolute top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] z-10 container max-w-lg
        rounded-lg shadow-lg shadow-black bg-white dark:bg-gray-900 dark:text-white
        ">
          <div class="relative flex flex-col gap-2 p-6" onInput={handleEditedData}>
            <button class="absolute top-0 right-0 p-2" onClick={() => setMenu(false)}><Icon name="FaSolidCircleXmark" class="size-5"/></button>
            <Show when={type() == "category"}>
              <label class="flex justify-between">Type: 
                <input name="type" class="w-4/6 rounded-lg p-1 text-black" type="number" value={(data() as Category)?.type ?? undefined}/>
              </label>
            </Show>
            <label class="flex justify-between">Title: 
              <input name="title" class="w-4/6 rounded-lg p-1 text-black" type="text" value={data()?.title || ''}/>
            </label>
            <label class="flex justify-between">Description: 
              <input name="description" class="w-4/6 rounded-lg p-1 text-black" type="text" value={data()?.description || ''}/>
            </label>
            <label class="flex justify-between">URL: 
              <input name="url" class="w-4/6 rounded-lg p-1 text-black" type="text" value={data()?.url || ''}/>
            </label>
            <label class="flex justify-between">Index: 
              <input name="index" class="w-4/6 rounded-lg p-1 text-black" type="number" value={data()?.index}/>
            </label>
            <Show when={type() == "category"}>
              <label class="flex justify-between">Icon: 
                <input name="icon" class="w-4/6 rounded-lg p-1 text-black" type="text" value={(data() as Category)?.icon || ''}/>
              </label>
              <label class="flex justify-between">Logo: 
                <input name="logo" class="w-4/6 rounded-lg p-1 text-black" type="text" value={(data() as Category)?.logo || ''}/>
              </label>
              <label class="flex justify-between">Official URL: 
                <input name="official_url" class="w-4/6 rounded-lg p-1 text-black" type="text" value={(data() as Category)?.official_url || ''}/>
              </label>
              <label class="flex justify-between">Roadmap URL: 
                <input name="roadmap_url" class="w-4/6 rounded-lg p-1 text-black" type="text" value={(data() as Category)?.roadmap_url || ''}/>
              </label>
              <label class="flex justify-between">Parent Category ID: 
                <input name="parent_category_id" class="w-4/6 rounded-lg p-1 text-black" type="number" value={(data() as Category)?.parent_category_id}/>
              </label>
            </Show>
            <Show when={type() == "resource"}>
              <label class="flex justify-between">Category ID: 
                <input name="category_id" class="w-4/6 rounded-lg p-1 text-black" type="number" value={(data() as Resource)?.category_id}/>
              </label>
            </Show>
            <Show when={typeMenu() == "create"} fallback={<button class="rounded-lg p-2 bg-white text-black text-center font-medium" onClick={() => update((data() as any)?.id)}>Save</button>}>
              <button class="rounded-lg p-2 bg-white text-black text-center font-medium" onClick={() => post()}>Create</button>
            </Show>
          </div>
        </div>
      </Show>
    </Main>
  );
}