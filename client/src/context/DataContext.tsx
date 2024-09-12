import { Accessor, JSXElement, Setter, batch, createContext, createEffect, on, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { getCategories } from "services/category";
import { getResources } from "services/resource";
import { useIndexedDB } from "./IndexedDB";
import { iconList } from "components/ui/icon";

export const DataContext = createContext();

interface Item {
  title: string;
  description: string;
  url: string; 
}

interface Category extends Item {
	id: number;
	parent_category_id: number;
  type: "category" | "resource";
  icon: iconList;
  items: Array<Category | Item>;
}

export default function DataProvider(props: {children: JSXElement}) {
  const [data, setData] = createStore<{
		routes: Map<string, object>;
		path: Array<{title: string, url: string}>; 
		item: Category;
		categories: Array<Category>
	}>({
		routes: new Map(),
    path: [],
    item: {} as Category,
    categories: []
	});
	const [categoriesResponse, setCategoriesResponse] = getCategories() as [Accessor<{data: any}>, Setter<any>];
	const [resourcesResponse, setResourcesResponse] = getResources() as [Accessor<{data: any}>, Setter<any>];
	const [useStore] = useIndexedDB();
	const [categoryData, categoryStore] = useStore("category");
	const [resourceData, resourceStore] = useStore("resource");
	const navigate = useNavigate();
  const location = useLocation();
  const path = () => location.pathname;

	function updateDatabase(data: any, store: any) {
		const dataLength = data.length;

		if(dataLength) {
			for(let i = 0; i < dataLength; i++) {
				store.put(data[i]);
			}
		}
	}

	createEffect(on([categoriesResponse, resourcesResponse], ([categories, resources]) => {
		if(categories && resources) {
			if(categories?.data) {
				updateDatabase(categories?.data, categoryStore);
				categoryStore.getAll();
			}

			if(resources?.data) {
				updateDatabase(resources?.data, resourceStore);
				resourceStore.getAll();
			}
		}
	}));

	createEffect(on([categoryData], ([categories]) => {
		function buildCategoryHierarchy(parentId: number | null = null, parentURL?: string): Array<Category> {
			const categoryTree: Array<Category> = [];

			(categories as Array<Category>).forEach((category) => {
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

		if((categories as Array<Category>)?.length) {
			const database = buildCategoryHierarchy();
			
			console.log("Dados", categories)
			console.log("banco de dados", database);
		}
	}));


	createEffect(on(path, (path) => {

	}))


	return (
		<DataContext.Provider value={{data, setData}}>
      {props.children}
		</DataContext.Provider>
	);
}

export const useData = () => useContext<any>(DataContext);