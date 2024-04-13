import { JSXElement, createContext, createEffect, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { useLocation } from "@solidjs/router";
import useFetch from "hooks/useFetch";

interface Item {
  type: string;
  mode?: string;
  title: string;
  description: string;
  url: string;
  logo?: string;
  icon?: string;
  roadmap?: string;
  official?: string;
  items?: Array<Item>;
}

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

export const DataContext = createContext();

export default function DataProvider(props: {children: JSXElement}) {
  const [categories] = useFetch<Array<Category>>('GET', `/category`);
  const [resources] = useFetch<Array<Resource>>('GET', `/resource`);
  const location = useLocation();
  const path = () => location.pathname;
	const [data, setData] = createStore<{map: Map<string, object>; navigation: Array<{title: string, url: string}>; item: Item, data: any}>({
    map: new Map(),
    navigation: [],
    item: {} as Item,
    data: [] as any
  });

  createEffect(() => {
    if(categories() && resources()) {
      const categoryList = categories() || [];
      const resourceList = resources() || [];

      for(let i = 0; i < categoryList.length; i++) {
        resourceList.forEach(resource => {
          if(resource.category_id == categoryList[i].id) {
            if(!categoryList[i].hasOwnProperty('items')) {
              categoryList[i].items = [];
              categoryList[i].items.push(resource);
            }
          }
        })
      }
      
      function buildCategoryHierarchy(parentId: number | null = null, parentURL?: string): Array<any> {
        const categoryTree: Array<any> = [];
    
        categoryList.forEach(category => {
          if(category.parent_category_id == parentId) {
            if(parentURL) {
              category.url = `${parentURL}${category.url}`;
            }
            
            let categoryObject: any = category;
            const subcategories = buildCategoryHierarchy(category.id, category.url);
    
            if(subcategories.length) {
              categoryObject = {...categoryObject, items: subcategories}
            }
            
            categoryTree.push(categoryObject);
          }
        })

        return categoryTree;
      }
      const database = buildCategoryHierarchy();

      setData("data", database);

      (function setMap(items: Array<object>) {
        items.forEach((item: any) => {
          if("items" in item && item.items) {
            data.map.set(item.url, item);
            setMap(item.items);
          }
        });
      })(database);

      data.map.set("/", {type: "category", items: database});
      setData("item", data.map.get(path()) as Item);

    }
  });

  createEffect(() => {
    setData("navigation", []);
    setData("item", {
      type: '',
      mode: '',
      title: '',
      description: '',
      url: '',
      logo: '',
      icon: '',
      official: '',
      roadmap: '',
      items: [],
    });

    setData("item", data.map.get(path()) as Item);

    if(path() != "/") {
      const url = path().substring(1).split("/");
      let currentPath = '';
  
      for(let index = 0; index < url.length; index++) {
        currentPath += "/" + url[index];

        if(data.map.has(currentPath)) {
          let item: {title: string, url: string} = data.map.get(currentPath) as {title: string, url: string};
          setData("navigation", (paths) => [...paths, {title: item.title, url: item.url} ]);
        }
      }
    }
  })

	return (
		<DataContext.Provider value={{data, setData}}>
			{props.children}
		</DataContext.Provider>
	);
}

export const useData = () => useContext<any>(DataContext);