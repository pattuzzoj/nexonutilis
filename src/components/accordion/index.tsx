import useSwitch from "hooks/useSwitch";
import { For, Show, createEffect } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import Icon from "components/icon";
import Title from "components/typography/title";

interface Props {
  data: any;
}

export default function Accordion(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const path = () => location.pathname;
  const initialState = () => path().startsWith(props.data.url);
  const [isOpen, setIsOpen] = useSwitch<boolean>(initialState());

  createEffect(() => path() && setIsOpen(initialState()));

  return (
    <nav class="w-full flex flex-col gap-2" aria-labelledby={props.data.title}>
      <Title as={(props.data.url.substring(1).split("/").length + 1) <= 6 ? (props.data.url.split("/").length) : "6"} id={props.data.title}>
        <a class={`${isOpen() ? "text-white bg-gray-500" : "text-gray-900 dark:text-white"} group flex items-center gap-2 p-2 rounded-lg font-medium text-base hover:text-white hover:bg-gray-400`} href={props.data.url} onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen());
          navigate(isOpen() ? props.data.url : props.data.url.slice(0, (props.data.url).lastIndexOf("/")));
        }}>
          <Show when={props.data?.icon} fallback={<Icon name="RiArrowsArrowRightSLine" class={`${isOpen() && "rotate-90"} size-7 transition-transform`} />}>
            <Icon name={props.data.icon} class={`${isOpen() ? "rotate-90 text-white" : "text-gray-600 dark:text-white"} group-hover:text-white size-7 transition-transform`} />
          </Show>
          {props.data.title}
        </a>
      </Title>
      <ul class={`${isOpen() ? "h-full" : "h-0"} ml-4 flex flex-col gap-2 overflow-hidden transition-[height] duration-300`}>
        <For each={props.data.items}>
          {(item) => (
            <Show when={item.type == "resources"} fallback={<Accordion data={item}/>}>
              <a class={`${(path() == item.url) ? "text-white bg-gray-500 text-end" : ""} hover:text-white hover:bg-gray-400 w-full rounded-lg py-1 px-4 text-base`} href={item.url}>{item.title}</a>
            </Show>
          )}
        </For>
      </ul>
    </nav>
  );
}
