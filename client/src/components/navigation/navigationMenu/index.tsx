import { For, Switch, Match, createEffect, createSignal } from "solid-js";
import { A, useLocation, useNavigate } from "@solidjs/router";
import Icon from "components/ui/icon";
import { useData } from "context/DataContext";
import { Category } from "types/interfaces";

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
    <nav class="flex flex-col">
      <A 
      class="group flex items-center gap-2 rounded-xl py-1 px-2 hover:bg-gray-100 dark:hover:bg-zinc-700 hover:scale-105 text-white/80 hover:text-white duration-200"
      activeClass="text-white/100 bg-gray-100 dark:bg-zinc-700 scale-105"
      href={props.url}
      style={`font-size: ${1.5 - (0.15 * props.depth) + "rem"}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(isOpen() ? props.url.slice(0, props.url.lastIndexOf("/")) + " " : props.url);
      }}
      >
        <Icon name={props.icon} class={`${isOpen() && "animate-spin"} size-5 group-hover:animate-spin duration-0`}/>
        {props.title}
      </A>
      <div class={`${isOpen() && "max-h-screen scale-100 translate-x-0"} max-h-0 overflow-hidden -translate-x-full flex flex-col gap-1.5 mt-1.5 duration-500 px-2`}>
        <For each={props.items as Array<Category>}>
          {(item) => (
            <Switch>
              <Match when={item.type == "category"}>
                <NavigationMenuItem {...item} depth={(props.depth || 2) + 1}/>
              </Match>
              <Match when={item.type == "resource"}>
                <A
                class="py-1 px-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 text-sm hover:scale-105 text-white/80 hover:text-white duration-200"
                activeClass="text-white/100 bg-gray-100 dark:bg-zinc-700 scale-105"
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(window.location.pathname.includes(item.url) ? item.url.slice(0, item.url.lastIndexOf("/")) + " " : item.url);
                }}
                >{item.title}</A>
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
    <div class="h-full flex flex-col gap-1 overflow-y-scroll p-2 rounded-2xl bg-gray-300 dark:bg-zinc-900">
      <For each={data.menu}>
        {(item) => <NavigationMenuItem {...item} depth={2}/>}
      </For>
    </div>
  )
}

export default NavigationMenu;