import { JSXElement, createContext, createEffect, createSignal, on, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { useLocation, useNavigate } from "@solidjs/router";
import { database } from "database";
import { Category } from "models/interfaces/category";
import Icon from "components/icon";

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
      let currentPath = '';

      path.substring(1).split("/").forEach(url => {
        currentPath += "/" + url;

        if(data.routes.has(currentPath)) {
          const item: {title: string, url: string} = data.routes.get(currentPath) as {title: string, url: string};
          setData("path", (paths) => [...paths, {title: item.title, url: item.url} ]);
        } else if(currentPath != '/saved') {
            navigate("/404");
        }
      })
    }
  }));

  const [isLoading, setIsLoading] = createSignal(true);

  setTimeout(() => setIsLoading(false), 1000)

	return (
		<DataContext.Provider value={{data, setData}}>
      <div class={`${!isLoading() && "scale-0"} absolute top-0 left-0 z-20 h-full w-full flex justify-center items-center text-white bg-zinc-800 transition-all duration-500`}>
        <Icon name="FaBrandsConnectdevelop" class="size-12 animate-spin duration-300"/>
      </div>
      {props.children}
		</DataContext.Provider>
	);
}

export const useData = () => useContext<any>(DataContext);