import { For, Switch, Match, createEffect, createSignal } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import Icon, { iconList } from "components/ui/icon";
import { useData } from "context/DataContext";

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

interface NavigationMenuItemProps extends Category {
  depth: number;
}

function NavigationMenuItem(props: NavigationMenuItemProps) {
  const navigate = useNavigate();
  const path = () => useLocation().pathname;
  const initialState = () => path().startsWith(props.url);
  const [isOpen, setIsOpen] = createSignal<boolean>(initialState());

  createEffect(() => path() && setIsOpen(initialState()));

  return (
    <nav class="w-full flex flex-col gap-2" aria-label={props.title} aria-expanded={isOpen() ? "true" : "false"}>
      <a
      class={`${isOpen() && "bg-gray-100 dark:bg-zinc-700"} group flex items-center gap-2 rounded-xl py-1 px-2 text-inherit
      ]] hover:bg-gray-100 dark:hover:bg-zinc-700`} href={!isOpen() ? props.url : props.url.slice(0, (props.url).lastIndexOf('/'))}
      style={`font-size: ${1.5 - (0.15 * props.depth) + "rem"}`}
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(!isOpen());
        navigate(isOpen() ? props.url : props.url.slice(0, (props.url).lastIndexOf('/')));
      }}
      >
        <Icon name={props?.icon || "RiArrowsArrowRightSLine"} class={`${isOpen() && "animate-spin"} group-hover:animate-spin size-6`}/>
        {props.title}
      </a>
      <div class={`${isOpen() ? "h-full" : "h-0 scale-0"} ml-4 flex flex-col gap-1.5 overflow-hidden transition-all duration-300`} >
        <For each={props.items as Array<Category>}>
          {(item) => (
            <Switch>
              <Match when={item.type == "category"}>
                <NavigationMenuItem {...item} depth={(props.depth || 2) + 1}/>
              </Match>
              <Match when={item.type == "resource"}>
                <a class={`${(path() == item.url) && "bg-gray-100 dark:bg-zinc-700 text-sm"} w-full py-1 px-2 text-sm rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all`} href={item.url}>{item.title}</a>
              </Match>
            </Switch>
          )}
        </For>
      </div>
    </nav>
  );
}

function NavigationMenu() {
  const [data] = useData();

  return (
    <For each={data.categories}>
      {(item) => <NavigationMenuItem {...item} depth={2}/>}
    </For>
  )
}

export default NavigationMenu;