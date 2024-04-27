import { JSXElement, createContext, createEffect, on, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { useLocation, useNavigate } from "@solidjs/router";
import { database } from "database";
import { Category } from "models/interfaces/category";

export const DataContext = createContext();

export default function DataProvider(props: {children: JSXElement}) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = () => location.pathname;
  const [data, setData] = createStore<{routes: Map<string, object>; path: Array<{title: string, url: string}>; item: Category; categories: Array<Category>}>({
    routes: new Map(),
    path: [],
    item: {} as Category,
    categories: []
  });

  data.routes.set("/", database);
  database.items.forEach(category => setData("categories", (categories) => [...categories, category as Category]));

  (function setRoutes(categories: Array<Category>, parentURL: string = '') {
    categories.forEach((category: Category) => {
      if(category.hasOwnProperty("items")) {
        category.url = parentURL + category.url;
        setRoutes(category.items as Array<Category>, category.url);
        data.routes.set(category.url, category);
      }
    })
  })(data.categories as Array<Category>);

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
        } else {
          if(currentPath != '/saved') {
            navigate("/404");
          }
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