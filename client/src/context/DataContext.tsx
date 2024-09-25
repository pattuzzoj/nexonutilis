import { Accessor, JSXElement, Setter, createContext, createEffect, createSignal, on, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate, useLocation } from "@solidjs/router";
import { getCategories } from "services/category";
import { getResources } from "services/resource";
import { useIndexedDB } from "./IndexedDB";
import { Category, Item } from "types/interfaces";
import Icon from "components/ui/icon";

export const DataContext = createContext();

function DataProvider(props: {children: JSXElement}) {
  const [data, setData] = createStore<{
		routes: Map<string, Category>;
		path: Array<{title: string, url: string}>; 
		item: Category;
		menu: Array<Category>;
	}>({
		routes: new Map(),
    path: [],
    item: {} as Category,
    menu: []
	});

	const [useStore] = useIndexedDB();
	const [resourceData, resourceStore] = useStore("resource");
	const [categoryData, categoryStore] = useStore("category");
	// const [categoriesResponse] = getCategories() as [Accessor<{data: any, deletedIds: Array<number>}>, Setter<any>];
	// const [resourcesResponse] = getResources() as [Accessor<{data: any, deletedIds: Array<number>}>, Setter<any>];
	const navigate = useNavigate();
  const location = useLocation();
  const path = () => location.pathname;
  const [isLoading, setIsLoading] = createSignal(true);

	// createEffect(on(categoriesResponse, (categories) => {
	// 	categories.data.forEach((category: any) => {
	// 		categoryStore.put(category);
	// 	});

	// 	categories.deletedIds.forEach(id => {
	// 		categoryStore.del(id);
	// 	});

	// 	if(categories.data.length || categories.deletedIds.length) {
	// 		categoryStore.getAll();
	// 	}
	// }, {defer: true}));

	// createEffect(on(resourcesResponse, (resources) => {
	// 	resources.data.forEach((resource: any) => {
	// 		resourceStore.put(resource);
	// 	});

	// 	resources.deletedIds.forEach(id => {
	// 		categoryStore.del(id);
	// 	});

	// 	if(resources.data.length || resources.deletedIds.length) {
	// 		resourceStore.getAll();
	// 	}
	// }, {defer: true}));

	createEffect(on(categoryData, (categories: Array<Category>) => {
		if(categories) {
			const startedMenu: Array<Category> = [];
			const menu = buildHierarchy();

			function buildHierarchy(parentId: number | null = null, parentURL: string = "") {
				const categoryTree: Array<Category> = [];

				categories.forEach((category) => {
					if(category.parent_category_id == parentId) {
						category.url = parentURL + category.url;
						
						data.routes.set(category.url, {...category});
						const subCategories = buildHierarchy(category.id, category.url);

						const currentCategory = {...category};

						if(subCategories.length) {
							currentCategory.items = subCategories;
						}

						categoryTree.push(currentCategory);
					}
				});

				return categoryTree;
			};

			setData("menu", menu);
			
			categories.forEach((category) => {
				if(category.parent_category_id == null) {
					startedMenu.push(category);
				}
			});
			data.routes.set("/", {id: null, type: "category", items: startedMenu} as unknown as Category);

			setRoute(path());
			setTimeout(() => setIsLoading(false), 200)
		}
	}, {defer: true}));

	function setRoute(path: string) {
		if(data.routes.has(path)) {
			const item = data.routes.get(path)!;
			const items: Array<Category | Item> = [];
			const currentItem: Category = {...item, items};

			if(item.type == "category") {
				categoryData().forEach((category: Category) => {
					if(category.parent_category_id == item.id) {
						items.push(category);
					}
				});
			} else {
				resourceData().forEach((resource: Item) => {
					if(resource.category_id == item.id) {
						items.push(resource);
					}
				});
			}

			setData("item", currentItem);

			if(path != '/') {
				let currentPath = '';
				
				path.substring(1).split("/").forEach(url => {
					currentPath += "/" + url;
	
					if(data.routes.has(currentPath)) {
						const {title, url} = data.routes.get(currentPath) as {title: string, url: string};
						setData("path", data.path.length, {title, url});
					}
				})
			}
		} else if(path != "/favorites") {
			navigate("/404");
		}
	}

	createEffect(on(path, (path) => {
		setData("path", []);
		setRoute(path);
	}, {defer: true}));
	
	return (
		<DataContext.Provider value={[data, setData]}>
			<div class={`${!isLoading() && "invisible opacity-0 scale-0"} absolute top-0 left-0 z-50 h-full w-full flex justify-center items-center text-primary bg-primary delay-100 transition-["height"] duration-1000`}>
				<Icon name="FaBrandsConnectdevelop" class="size-12 animate-spin duration-300"/>
			</div>
      {props.children}
		</DataContext.Provider>
	);
}

const useData = (): [
	{
		routes: Map<string, Category>;
		path: Array<{title: string, url: string}>; 
		item: Category;
		menu: Array<Category>;
	},
	{
		routes: Map<string, Category>;
		path: Array<{title: string, url: string}>; 
		item: Category;
		menu: Array<Category>;
	}
] => useContext<any>(DataContext);

export default DataProvider;
export {useData};