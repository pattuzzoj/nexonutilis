import { For, Switch, Match, createEffect, createSignal } from "solid-js";
import { A, useLocation, useNavigate } from "@solidjs/router";
import Icon from "components/ui/icon";
import { Category } from "types/interfaces";

interface MenuItemProps extends Category {
  depth: number;
}

function NavigationMenuItem(props: MenuItemProps) {
  const navigate = useNavigate();
  const path = () => useLocation().pathname;
  const initialState = () => path().startsWith(props.url);
  const [isOpen, setIsOpen] = createSignal<boolean>(initialState());
  createEffect(() => path() && setIsOpen(initialState()));

  return (
    <nav class="flex flex-col">
      <A 
      class="group flex items-center gap-2 rounded-xl py-1 px-2 hover:text-hover hover:bg-hover active:bg-active hover:scale-95 duration-200"
      activeClass="text-accent bg-accent"
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
                class="py-1 px-2 rounded-xl text-sm hover:scale-95 hover:text-hover hover:bg-hover active:bg-active duration-200"
                activeClass="text-accent bg-accent"
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

export default NavigationMenuItem;