import useSwitch from "hooks/useSwitch";
import { For, Switch, Match, createEffect } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import Icon from "components/icon";
import Title from "components/typography/title";

interface MenuItemProps {
  type: string;
  mode?: string;
  title: string;
  description: string;
  url: string;
  logo?: string;
  icon?: any;
  roadmap?: string;
  official?: string;
  items?: Array<MenuItemProps>;
  depth: number;
}

export default function MenuItem(props: MenuItemProps) {
  const navigate = useNavigate();
  const path = () => useLocation().pathname;
  const initialState = () => path().startsWith(props.url);
  const [isOpen, setIsOpen] = useSwitch<boolean>(initialState());

  createEffect(() => path() && setIsOpen(initialState()));
  
  return (
    <nav class="w-full flex flex-col gap-2" aria-label={props.title}>
      <Title as={String(props.depth) as "2" | "3" | "4" | "5" | "6"} class="group">
        <a
        class={`${isOpen() && "bg-gray-100 dark:bg-zinc-700"} flex items-center gap-2 rounded-xl py-1 px-2 text-inherit group-hover:text-lg
        ]] hover:bg-gray-100 dark:hover:bg-zinc-700`} href={props.url}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen());
          navigate(isOpen() ? props.url : props.url.slice(0, (props.url).lastIndexOf('/')));
        }}
        >
          <Icon name={props?.icon || "RiArrowsArrowRightSLine"} class={`${isOpen() && "animate-spin"} group-hover:animate-spin size-6`}/>
          {props.title}
        </a>
      </Title>
      <nav class={`${isOpen() ? "h-full" : "h-0 scale-0"} flex flex-col gap-1.5 overflow-hidden transition-all duration-300`}>
        <For each={props?.items}>
          {(item) => (
            <Switch>
              <Match when={item?.type == "category"}>
                <MenuItem {...item} depth={(props.depth || 2) + 1}/>
              </Match>
              <Match when={item?.type == "resource"}>
                <a class={`${(path() == item.url) && "bg-gray-100 dark:bg-zinc-700 text-sm"} w-full py-1 px-2 text-base hover:text-sm rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all`} href={item.url}>{item.title}</a>
              </Match>
            </Switch>
          )}
        </For>
      </nav>
    </nav>
  );
}
