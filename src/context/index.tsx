import { JSXElement, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export const DataContext = createContext();

export default function DataProvider(props: {children: JSXElement}) {
	const [data, setData] = createStore({
		currentItems: [],
		item: {
			type: "",
			title: "",
			description: "",
			items: [],
			url: ""
		}
	});

	return (
		<DataContext.Provider value={{data, setData}}>
			{props.children}
		</DataContext.Provider>
	)
}

export const useData = () => useContext<any>(DataContext);