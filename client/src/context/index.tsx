import { JSXElement, createContext, createEffect, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { database } from "database";
import { useLocation } from "@solidjs/router";

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

export const DataContext = createContext();

export default function DataProvider(props: {children: JSXElement}) {
  const location = useLocation();
  const path = () => location.pathname;
	const [data, setData] = createStore<{map: Map<string, object>; navigation: Array<{title: string, url: string}>; item: Item}>({
    map: new Map(),
    navigation: [],
    item: {} as Item,
  });
	
  data.map.set("/", database);
  
	(function setMap(items: Array<object>) {
		items.forEach((item: any) => {
      if("items" in item) {
        const {type, mode, title, description, url, logo, icon, roadmap, official} = item;
        console.log(`"type": "${type}",\n"mode": "${mode}",\n"title": "${title}",\n"description": "${description}",\n"url": "${url}",\n"logo": "${logo}",\n"icon": "${icon}",\n"roadmap": "${roadmap}",\n"official": "${official}"`);
        data.map.set(item.url, item);
				setMap(item.items);
			}
		});
  })(database.items);


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