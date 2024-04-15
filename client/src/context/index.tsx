import { JSXElement, createContext, createEffect, on, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { useLocation } from "@solidjs/router";
import useFetch from "hooks/useFetch";

interface Item {
  id: number;
  title: string;
  description: string;
  url: string;
  index: number;
}

interface Resource extends Item {
  category_id: number;
}

interface Category extends Item {
  type: string;
  parent_category_id: number;
  icon: string;
  logo: string;
  official_url: string;
  roadmap_url: string;
  items: Array<Category | Resource>;
}

export const DataContext = createContext();

export default function DataProvider(props: {children: JSXElement}) {
  const [categories] = useFetch<Array<Category>>('GET', `/categoryData`);
  const [resources] = useFetch<Array<Resource>>('GET', `/resource`);
  const location = useLocation();
  const path = () => location.pathname;
  const [data, setData] = createStore<{routes: Map<string, object>; path: Array<{title: string, url: string}>; item: Category; data: Array<Category>}>({
    routes: new Map(),
    path: [],
    item: {} as Category,
    data: {} as Array<Category>
  });

  createEffect(on([categories, resources], ([categories, resources]) => {
    console.log(categories);

    if(categories && resources) {
      const categoryList: Array<Category> = categories;
      const resourceList: Array<Resource> = resources;

      resourceList.forEach(resource => {
        for(let i = 0; i < categoryList.length; i++) {
          if(categoryList[i].id == resource.category_id) {
            if(!categoryList[i].hasOwnProperty("items")) {
              categoryList[i].items = [resource];
            } else {
              categoryList[i].items.push(resource);
            }
          }
        }
      })

      function buildCategoryHierarchy(parentId: number | null = null, parentURL?: string): Array<Category> {
        const categoryTree: Array<Category> = [];

        categoryList.forEach(category => {
          if(category.parent_category_id == parentId) {
            if(parentURL) {
              category.url = `${parentURL}${category.url}`;
            }
            
            let categoryObject: Category = category;
            const subcategories = buildCategoryHierarchy(category.id, category.url);

            if(subcategories.length) {
              categoryObject = {...categoryObject, items: subcategories}
            }

            categoryTree.push(categoryObject);
          }
        })

        return categoryTree;
      }

      const categoryHierarchy = buildCategoryHierarchy();

      setData("data", categoryHierarchy);
      data.routes.set("/", {type: "category", items: categoryHierarchy});

      (function setRoutes(categories: Array<Category>) {
        categories.forEach((category: Category) => {
          if(category.hasOwnProperty("items")) {
            if(category.type == "category") {
              setRoutes(category.items as Array<Category>);
            }

            data.routes.set(category.url, category);
          }
        })
      })(categoryHierarchy);

      setData("item", data.routes.get(path()) as Item);
    }
  }));

  createEffect(on(path, (path) => {
    setData("path", []);

    if(data.routes.has(path)) {
      setData("item", data.routes.get(path) as Category);
    }

    if(path != '/') {
      const url = path.substring(1).split("/");
      let currentPath = '';

      for(let index = 0; index < url.length; index++) {
        currentPath += "/" + url[index];

        if(data.routes.has(currentPath)) {
          const item: {title: string, url: string} = data.routes.get(currentPath) as {title: string, url: string};
          setData("path", (paths) => [...paths, {title: item.title, url: item.url} ]);
        }
      }
    }
  }));

	return (
		<DataContext.Provider value={{data, setData}}>
			{props.children}
		</DataContext.Provider>
	);
}

export const useData = () => useContext<any>(DataContext);