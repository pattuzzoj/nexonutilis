import { JSXElement, batch, createContext, createEffect, on, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { getCategories } from "services/category";
import { getResources } from "services/resource";
import { useIndexedDB } from "./IndexedDB";

export const DataContext = createContext();

export default function DataProvider(props: {children: JSXElement}) {
  const [data, setData] = createStore<{}>({});
	const [categoriesResponse, setCategoriesResponse] = getCategories();
	const [resourcesResponse, setResourcesResponse] = getResources();
	const [useStore] = useIndexedDB();
	const categoryStore = useStore("category");
	const resourceStore = useStore("resource");

	
	createEffect(() => batch(() => {
		console.log(categoriesResponse(), resourcesResponse());
	}))

	// createEffect(on([category, resource], ([categories, resources]) => {
	// 	if(categories && resources) {
	// 		console.log(categories, resources);
	// 	}
	// }));

	return (
		<DataContext.Provider value={{data, setData}}>
      {props.children}
		</DataContext.Provider>
	);
}

export const useData = () => useContext<any>(DataContext);