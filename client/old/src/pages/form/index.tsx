// import { For, Show, createEffect, createSignal } from "solid-js";
// import Main from "layout/main";
// import Icon from "components/icon";
// import useFetch from "hooks/useFetch";
// import { useData } from "context";

// interface Item {
//   id: number;
//   title: string;
//   description: string;
//   url: string;
//   index: number;
// }

// interface Resource extends Item {
//   category_id: number;
// }

// interface Category extends Item {
//   type: string;
//   parent_category_id: number;
//   icon: string;
//   logo: string;
//   official_url: string;
//   roadmap_url: string;
//   items: Array<Category | Resource>;
// }

// export default function Form() {
//   const {data: database} = useData();
//   const [type, setType] = createSignal<string>("category");
//   const [list, setList] = createSignal<Array<Category | Resource>>(database.data || []);
//   const [typeMenu, setTypeMenu] = createSignal<"create" | "edit" | "view">();
//   const [menu, setMenu] = createSignal<boolean>(false);
//   const [data, setData] = createSignal<Category | Resource>();
//   const [editedData, setEditedData] = createSignal<Category | Resource>();
//   const [path, setPath] = createSignal<Array<{title: string, items: any}>>([]);
//   let initialValue: Category;

//   createEffect(() => {
//     setList(database.data || []);
//   })

//   function handleEditedData(e: any) {
//     e.preventDefault();
//     const fields = [...e.currentTarget.elements];

//     fields.forEach(field => {
//       if(field.nodeName == 'INPUT') {
//         if(field.value ?? false) {
//           setEditedData({ ...editedData() as any, [field.name]: field.value });
//         }
//       }      
//     })

//     if(typeMenu() == "create") {
//       post();
//     } else if(typeMenu() == "edit") {
//       update(data()!.id);
//     }
//   }

//   function post() {
//     if(type() == "category") {
//       useFetch('POST', `/category`, editedData());
//     } else {
//       useFetch('POST', `/resource`, editedData());
//     }
    
//     setEditedData({} as any);
//   }

//   function update(id: number) {
//     if(type() == "category") {
//       useFetch('PUT', `/category/${id}`, editedData());
//     } else {
//       useFetch('PUT', `/resource/${id}`, editedData());
//     }

//     setEditedData({} as any);
//   }

//   function del(id: number) {
//     if(type() == "category") {
//       useFetch("DELETE", `/category/${id}`);
//     } else {
//       useFetch("DELETE", `/resource/${id}`);
//     }
//   }

//   return (
//     <Main class="relative">
//       <div class="w-full">
//         <Show when={path()}>
//           <span class="flex justify-between">
//             <span class="w-4/5 overflow-hidden overflow-x-scroll text-nowrap flex items-center gap-2 text-sm md:text-base">
//               <button class="flex rounded p-2 hover:text-white hover:bg-gray-400" onClick={() => {setList(database.data); setPath([]);}}>
//                 <Icon name="FiHome" class="size-6" />
//               </button>
//               <For each={path()}>
//                 {(item, index) => <><span class="font-bold text-xl">/</span><button class="rounded p1 md:p-2 hover:text-white hover:bg-gray-400" onClick={() => {setList(item.items); setPath(path().slice(0, index() + 1))}}>{item.title}</button></>}
//               </For>
//             </span>
//             <button class="flex justify-center items-center h-8 w-8 pb-1 rounded-lg text-3xl bg-gray-500" onClick={() => {setType("category"); setTypeMenu("create"); setMenu(true);}}>+</button>
//           </span>
//         </Show>
//         <br />
//         <div class="border rounded-lg">
//           <div>
//             <span class="flex justify-between gap-4 py-2 px-1 pl-4">
//               <span class="min-w-[5ch] text-center">ID</span>
//               <span class="w-2/12 text-start">Title</span>
//               <span class="w-6/12 text-start">Description</span>
//               <span class="w-3/12 text-start">URL</span>
//               <span class="w-1/12 text-center">Index</span>
//               <span class="min-w-[15ch] text-center">Actions</span>
//             </span>
//           </div>
//           <For each={list() as Array<Category>}>
//             {(item) => (
//               <span class="relative flex justify-between items-center gap-4 border-t-[1px] even:bg-gray-500 py-2 px-1 pl-4">
//                 <Show when={item.hasOwnProperty("items")}>
//                   <button class="absolute top-50 left-1.5 rounded text-lg bg-gray-900" onClick={() => {setList(item?.items); setPath([...path(), {title: item.title, items: item?.items}])}}><Icon name="TbMenu"/></button>
//                 </Show>
//                 <span class="min-w-[5ch] text-center">{item.id}</span>
//                 <span class="w-2/12 text-start">{item.title}</span>
//                 <span class="w-6/12 text-start line-clamp-1">{item.description}</span>
//                 <span class="w-3/12 text-start">{item?.type ? item.url.substring(item.url.lastIndexOf('/')) : item.url}</span>
//                 <span class="w-1/12 text-center">{item.index}</span>
//                 <span class="min-w-[15ch] flex justify-center gap-2">
//                 <Show when={item.hasOwnProperty("type")}>
//                   <button class="text-lg" onClick={() => {setType(item.type); setData({...initialValue, parent_category_id: item.id, category_id: item.id}); setTypeMenu("create"); setMenu(true);}}><Icon name="IoAddCircleOutline"/></button>
//                 </Show>
//                   <button class="text-lg" onClick={() => {setData({...item, url: item.url.substring(item.url.lastIndexOf('/'))}); setTypeMenu("edit"); setMenu(true);}}><Icon name="FiEdit"/></button>
//                   <button class="text-lg" onClick={() => del(item.id)}><Icon name="FiTrash"/></button>
//                 </span>
//               </span>
//             )}
//           </For>
//         </div>
//       </div>
//       <Show when={menu()}>
//         <div class="
//         absolute top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] z-10 container max-w-lg
//         rounded-lg shadow-lg shadow-black bg-white dark:bg-gray-900 dark:text-white
//         ">
//           <form class="relative flex flex-col gap-2 p-6" onSubmit={handleEditedData}>
//             <button class="absolute top-0 right-0 p-2" onClick={() => setMenu(false)}><Icon name="FaSolidCircleXmark" class="size-5"/></button>
//             <Show when={type() == "category"}>
//               <label class="flex justify-between">Type: 
//                 <input name="type" class="w-4/6 rounded-lg p-1 text-black" type="text" value={(data() as Category)?.type ?? 'category'}/>
//               </label>
//             </Show>
//             <label class="flex justify-between">Title: 
//               <input name="title" class="w-4/6 rounded-lg p-1 text-black" type="text" value={data()?.title || ''}/>
//             </label>
//             <label class="flex justify-between">Description: 
//               <input name="description" class="w-4/6 rounded-lg p-1 text-black" type="text" value={data()?.description || ''}/>
//             </label>
//             <label class="flex justify-between">URL: 
//               <input name="url" class="w-4/6 rounded-lg p-1 text-black" type="text" value={data()?.url || ''}/>
//             </label>
//             <label class="flex justify-between">Index: 
//               <input name="index" class="w-4/6 rounded-lg p-1 text-black" type="number" value={data()?.index}/>
//             </label>
//             <Show when={type() == "category"}>
//               <label class="flex justify-between">Icon: 
//                 <input name="icon" class="w-4/6 rounded-lg p-1 text-black" type="text" value={(data() as Category)?.icon || ''}/>
//               </label>
//               <label class="flex justify-between">Logo: 
//                 <input name="logo" class="w-4/6 rounded-lg p-1 text-black" type="text" value={(data() as Category)?.logo || ''}/>
//               </label>
//               <label class="flex justify-between">Official URL: 
//                 <input name="official_url" class="w-4/6 rounded-lg p-1 text-black" type="text" value={(data() as Category)?.official_url || ''}/>
//               </label>
//               <label class="flex justify-between">Roadmap URL: 
//                 <input name="roadmap_url" class="w-4/6 rounded-lg p-1 text-black" type="text" value={(data() as Category)?.roadmap_url || ''}/>
//               </label>
//               <label class="flex justify-between">Parent Category ID: 
//                 <input name="parent_category_id" class="w-4/6 rounded-lg p-1 text-black" type="number" value={(data() as Category)?.parent_category_id}/>
//               </label>
//             </Show>
//             <Show when={type() == "resource"}>
//               <label class="flex justify-between">Category ID: 
//                 <input name="category_id" class="w-4/6 rounded-lg p-1 text-black" type="number" value={(data() as Resource)?.category_id}/>
//               </label>
//             </Show>
//             <Show when={typeMenu() == "create"} fallback={<button class="rounded-lg p-2 bg-white text-black text-center font-medium">Save</button>}>
//               <button type="submit" class="rounded-lg p-2 bg-white text-black text-center font-medium">Create</button>
//             </Show>
//           </form>
//         </div>
//       </Show>
//     </Main>
//   );
// }