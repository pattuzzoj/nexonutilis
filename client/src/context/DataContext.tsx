import { Accessor, JSXElement, Setter, createContext, createEffect, on, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { iconList } from "components/ui/icon";
import { useNavigate, useLocation } from "@solidjs/router";
import { getCategories } from "services/category";
import { getResources } from "services/resource";
import { useIndexedDB } from "./IndexedDB";

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

function DataProvider(props: {children: JSXElement}) {
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

	const [useStore] = useIndexedDB();
	const [categoryData, categoryStore] = useStore("category");
	const [resourceData, resourceStore] = useStore("resource");
	const [categoriesResponse] = getCategories() as [Accessor<{data: any}>, Setter<any>];
	const [resourcesResponse] = getResources() as [Accessor<{data: any}>, Setter<any>];
  const navigate = useNavigate();
  const location = useLocation();
  const path = () => location.pathname;

	createEffect(on([categoryData, resourceData], ([categories, resources]) => {
		if(categories && resources) {
			const categoriesList = categories;
			const resourcesList = resources;
	
			let database: any = [];

      if((categoriesList as Array<Category>).length && (resourcesList as Array<any>).length) {
        (categoriesList as Array<Category>)?.forEach((category) => {
          category.items = [];
    
          (resourcesList as Array<any>)?.forEach((resource) => {
            if(category.id == resource.category_id) {
              category.items = [...category.items, resource];
            }
          })
    
          database.push(category);
        });
      }
	
			function buildCategoryHierarchy(parentId: number | null = null, parentURL?: string): Array<Category> {
				const categoryTree: Array<Category> = [];
	
				(database as Array<Category>).forEach((category) => {
					if(category.parent_category_id == parentId) {
						if(parentURL) {
							category.url = `${parentURL}${category.url}`;
						}
	
						const subcategories = buildCategoryHierarchy(category.id, category.url);
	
						if(subcategories.length) {
							category = {...category, items: subcategories}
						}
	
						categoryTree.push(category);
					}
				})
	
				return categoryTree;
			}
	
			let db = buildCategoryHierarchy();
      setData("categories", {...db});
      
      data.routes.set("/", {items: [...db]});
      setData("item", data.routes.get('/') as Category);

      (function setRoutes(categories: Array<Category>) {
        categories.forEach((category: Category) => {
          if(category.hasOwnProperty("items")) {
            setRoutes(category.items as Array<Category>);
            data.routes.set(category.url, {...category});
          }
        })
      })(db as Array<Category>);

			setData("item", data.routes.get(path()) as Category);
		}
	}, {defer: true}));

	createEffect(on(categoriesResponse, (categories) => {
		categories.data.forEach((category: any) => {
			categoryStore.put(category);
		})

		categoryStore.getAll();
	}, {defer: true}));

	createEffect(on(resourcesResponse, (resources) => {
		resources.data.forEach((resource: any) => {
			resourceStore.put(resource);
		});

		resourceStore.getAll();
	}, {defer: true}));

	createEffect(on(path, (path) => {
    setData("path", []);

    if(data.routes.has(path)) {
      setData("item", data.routes.get(path) as Category);
      console.log("path:", path, "item:", data.item);
    }

    if(path != '/') {
      let currentPath = '';

      path.substring(1).split("/").forEach(url => {
        currentPath += "/" + url;

        if(data.routes.has(currentPath)) {
          const item: {title: string, url: string} = data.routes.get(currentPath) as {title: string, url: string};
          setData("path", (paths: any) => [...paths, {title: item.title, url: item.url} ]);
        } else if(currentPath != '/saved') {
            navigate("/404");
        }
      })
    }
  }, {defer: true}));
	
	return (
		<DataContext.Provider value={[data, setData]}>
      {props.children}
		</DataContext.Provider>
	);
}

const useData = () => useContext<any>(DataContext);

export default DataProvider;
export {useData};