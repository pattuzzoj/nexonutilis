import { For, Match, Show, Switch, createEffect, createSignal } from "solid-js";
import Main from "layout/main";
import Icon from "components/icon";
import Title from "components/typography/title";
import useFetch from "hooks/useFetch";

interface Category {
  id: number;
  parent_category_id: number;
  type: number;
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

// async function fetchResource(method: string = 'GET', url: string, body?: any) {
//   const options: any = {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       'Access-Control-Allow-Origin': '*',
//     },
//     mode: 'cors'
//   }

//   if(body) {
//     options.body = JSON.stringify(body);
//   }

//   try {
//     const response = await fetch(url, options);

//     if(response.ok) {
//       const data = await response.json();

//       const nestedCategoryHierarchy = await buildCategoryHierarchy(null, '', data.data);
      
//       function buildCategoryHierarchy(parentId: number | null, parentURL: string, data?: any) {
//         console.log(data)
//         const categoryTree: any = [];
      
//         data.forEach((category: any) => {
//           if(category.parent_category_id === parentId) {
//             if(parentURL) {
//               category.url = `${parentURL}${category.url}`;
//             }
      
//             const subcategories = buildCategoryHierarchy(category.id, category.url, data);
//             const categoryObject = { ...category, items: subcategories };
//             categoryTree.push(categoryObject);
//           }
//         })
      
//         return categoryTree;
//       }

//       console.log(JSON.stringify(nestedCategoryHierarchy, null, 2));
//       return data.data;
//     } else {
//       const data = await response.json();
//       alert(data.error);
//     }
//   } catch(e) {
//     console.log(e);
//   }
// }

export default function Form() {
  // fetchResource('GET', `/category`);
  const [categories, {refetch: refetchCategories}] = useFetch<Array<Category>>('GET', `/category`);
  const [resources, {refetch: refetchResources}] = useFetch<Array<Resource>>('GET', `/resource`);
  const [type, setType] = createSignal<string>("category");
  const [list, setList] = createSignal<Array<Category | Resource>>([]);
  const [typeMenu, setTypeMenu] = createSignal<"create" | "edit" | "view">();
  const [menu, setMenu] = createSignal<boolean>(false);
  const [data, setData] = createSignal<Category | Resource>();
  const [editedData, setEditedData] = createSignal<Category | Resource>();

  createEffect(() => setList(categories() || []));

  function handleEditedData(e: any) {
    console.log(e.target)
    const { name, value } = e.target;
    
    setEditedData({ ...editedData() as any, [name]: value });
  }

  function post() {
    if(type() == "category") {
      useFetch('POST', `/category`, editedData());
      setTimeout(refetchCategories, 500);
    } else {
      useFetch('POST', `/resource`, editedData());
      setTimeout(refetchResources, 500);
    }

    setEditedData({} as any);
  }

  function update(id: number) {
    if(type() == "category") {
      useFetch('PUT', `/category/${id}`, editedData());
      setTimeout(refetchCategories, 500);
    } else {
      useFetch('PUT', `/resource/${id}`, editedData());
      setTimeout(refetchResources, 500);
    }

    setEditedData({} as any);
  }

  function del(id: number) {
    if(type() == "category") {
      useFetch("DELETE", `/category/${id}`);
      setTimeout(refetchCategories, 500);
    } else {
      useFetch("DELETE", `/resource/${id}`);
      setTimeout(refetchResources, 500);
    }
  }

  // setList(
  //   [
  //     {
  //       "id": 1,
  //       "parent_category_id": 0,
  //       "type": 0,
  //       "title": "Tech Hub",
  //       "description": "A comprehensive suite of productivity tools for businesses and individuals.",
  //       "url": "/tech-hub",
  //       "index": 0,
  //       "icon": "productivity_icon.png",
  //       "logo": "productivity_logo.png",
  //       "official_url": "https://www.productivitysuite.com/official",
  //       "roadmap_url": "https://www.productivitysuite.com/roadmap",
  //       "items": []
  //     },
  //     {
  //       "id": 2,
  //       "parent_category_id": 0,
  //       "type": 0,
  //       "title": "Development",
  //       "description": "An online platform for buying and selling various products.",
  //       "url": "/development",
  //       "index": 1,
  //       "icon": "marketplace_icon.png",
  //       "logo": "marketplace_logo.png",
  //       "official_url": "https://www.onlinemarketplace.com/official",
  //       "roadmap_url": "https://www.onlinemarketplace.com/roadmap",
  //       "items": []
  //     },
  //     {
  //       "id": 3,
  //       "parent_category_id": 2,
  //       "type": 0,
  //       "title": "JavaScript",
  //       "description": "Connect with friends, family, and colleagues through posts, photos, and messages.",
  //       "url": "/javascript",
  //       "index": 0,
  //       "icon": "socialnetwork_icon.png",
  //       "logo": "socialnetwork_logo.png",
  //       "official_url": "https://www.socialnetwork.com/official",
  //       "roadmap_url": "https://www.socialnetwork.com/roadmap",
  //       "items": []
  //     },
  //     {
  //       "id": 4,
  //       "parent_category_id": 3,
  //       "type": 0,
  //       "title": "Solid.js",
  //       "description": "Track your expenses, set budgets, and manage your finances effectively.",
  //       "url": "/solidjs",
  //       "index": 0,
  //       "icon": "budgetingapp_icon.png",
  //       "logo": "budgetingapp_logo.png",
  //       "official_url": "https://www.budgetingapp.com/official",
  //       "roadmap_url": "https://www.budgetingapp.com/roadmap",
  //       "items": []
  //     },
  //     {
  //       "id": 6,
  //       "parent_category_id": 0,
  //       "type": 0,
  //       "title": "API",
  //       "description": "Log your workouts, set fitness goals, and monitor your progress.",
  //       "url": "/api",
  //       "index": 2,
  //       "icon": "workoutapp_icon.png",
  //       "logo": "workoutapp_logo.png",
  //       "official_url": "https://www.workoutapp.com/official",
  //       "roadmap_url": "https://www.workoutapp.com/roadmap",
  //       "items": []
  //     },
  //     {
  //       "id": 5,
  //       "parent_category_id": 6,
  //       "type": 0,
  //       "title": "GPT",
  //       "description": "Access courses and educational resources from various disciplines.",
  //       "url": "/gpt",
  //       "index": 0,
  //       "icon": "onlinelearning_icon.png",
  //       "logo": "onlinelearning_logo.png",
  //       "official_url": "https://www.onlinelearningplatform.com/official",
  //       "roadmap_url": "https://www.onlinelearningplatform.com/roadmap",
  //       "items": []
  //     }
  //   ]
  // )

  function Table(props: any) {
    return (
      <For each={props.table}>
        {(item: Category) => (
          <div class="relative border-t-[1px] even:bg-gray-500">
            <span class="flex justify-around items-center gap-4 py-2">
              <span class="w-1/12 text-center">{item.id}</span>
              <span contentEditable class="w-1/12 text-center">{item.parent_category_id}</span>
              <span contentEditable class="w-1/12 text-center">{item.type}</span>
              <span contentEditable class="w-2/12 text-start">{item.title}</span>
              <span contentEditable class="w-6/12 text-start line-clamp-1">{item.description}</span>
              <span contentEditable class="w-3/12 text-start">{item.url}</span>
              <span contentEditable class="w-1/12 text-center">{item.index}</span>
              <span contentEditable class="w-1/12 flex justify-center gap-4">
                <button class="text-lg" onClick={() => {setData(item); setTypeMenu("view"); setMenu(true);}}><Icon name="FiInfo"/></button>
                <button class="text-lg" onClick={() => {setData(item); setTypeMenu("edit"); setMenu(true);}}><Icon name="FiEdit"/></button>
                <button class="text-lg" onClick={() => del(item.id)}><Icon name="FiTrash"/></button>
              </span>
            </span>
          </div>
        )}
      </For>
    )
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
          <div>
            <span class="flex justify-around gap-4 py-2">
              <span class="w-1/12 text-center">ID</span>
              <span class="w-1/12 text-center">Parent ID</span>
              <span class="w-1/12 text-center">Type</span>
              <span class="w-2/12 text-start">Title</span>
              <span class="w-6/12 text-start">Description</span>
              <span class="w-3/12 text-start">URL</span>
              <span class="w-1/12 text-center">Index</span>
              <span class="w-1/12 text-center">Actions</span>
            </span>
          </div>
          <Table table={list()}/>
        </div>
      </div>
      <Show when={menu()}>
        <div class="
        absolute top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] z-10 container max-w-lg
        rounded-lg shadow-lg shadow-black bg-white dark:bg-gray-900 dark:text-white
        ">
          <div class="relative flex flex-col gap-2 p-6" onInput={handleEditedData}>
            <button class="absolute top-0 right-0 p-2" onClick={() => setMenu(false)}><Icon name="FaSolidCircleXmark" class="size-5"/></button>
            <label class="flex justify-between">ID: 
              <input name="id" class="w-4/6 rounded-lg p-1 text-black" type="number" value={data()?.id} disabled/>
            </label>
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
                <input name="parent_category_id" class="w-4/6 rounded-lg p-1 text-black" type="number" value={(data() as Resource)?.category_id}/>
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