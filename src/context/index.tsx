import { JSXElement, createContext, createEffect, on, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { useLocation } from "@solidjs/router";
import { database } from "database";

interface Item {
  title: string;
  description: string;
  url: string; 
}

interface Category extends Item {
  type: string;
  icon: string;
  logo: string;
  official_url: string;
  roadmap_url: string;
  items: Array<Category | Item>;
}

export const DataContext = createContext();

export default function DataProvider(props: {children: JSXElement}) {
  const location = useLocation();
  const path = () => location.pathname;
  const [data, setData] = createStore<{routes: Map<string, object>; path: Array<{title: string, url: string}>; item: Category; data: Array<Category>}>({
    routes: new Map(),
    path: [],
    item: {} as Category,
    data: {} as Array<Category>
  });

  data.routes.set("/", database);
  setData("data", database.items as Array<Category>);

  (function setRoutes(categories: Array<Category>, parentURL: string = '') {
    categories.forEach((category: Category) => {
      if(category.hasOwnProperty("items")) {
        setRoutes(category.items as Array<Category>, category.url);
        category.url = parentURL + category.url;

        data.routes.set(category.url, category);
      }
    })
  })(database.items as Array<Category>);

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