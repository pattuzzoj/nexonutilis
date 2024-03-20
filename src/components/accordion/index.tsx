import useSwitch from "hooks/useSwitch";
import { For, Show, createEffect, createMemo } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import Icon from "components/icon";
import Title from "components/typography/title";

interface Props {
  data: any;
}

export default function Accordion(props: Props) {
  const location = useLocation();
  const path = () => location.pathname;
  const initialState = createMemo(() => path().startsWith(props.data.url));

  const [isOpen, setIsOpen] = useSwitch<boolean>(initialState());

  createEffect(() => path() && setIsOpen(initialState()));

  const navigate = useNavigate();

  return (
    <nav class="w-full flex flex-col gap-2" aria-labelledby={props.data.title}>
      <Title as={(props.data.url.split("/").length + 2) <= 6 ? (props.data.url.split("/").length) : "5"} id={props.data.title}>
        <a class={`${isOpen() && "dark:text-[#2c2c54] bg-[#414066] dark:bg-white"} flex items-center gap-2 p-2 rounded hover:dark:text-[#2c2c54] hover:dark:bg-white`} href={props.data.url} onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen());
          navigate(isOpen() ? props.data.url : props.data.url.slice(0, (props.data.url).lastIndexOf("/")));
        }}>
          <Icon name="RiArrowsArrowRightSLine" class={`${isOpen() && "rotate-90"} size-7 transition-transform`} />
          {props.data.title}
        </a>
      </Title>

      <ul class={`${isOpen() ? "h-full" : "h-0"} flex flex-col gap-2 overflow-hidden transition-[height] duration-500`}>
        <For each={props.data.items}>
          {(item) => (
            <Show when={item.type == "resources"} fallback={<Accordion data={item}/>}>
              <a class={`${(path() == item.url) && "text-end dark:text-[#2c2c54] bg-[#414066] dark:bg-white"} w-full rounded py-1 px-4 hover:dark:text-[#2c2c54] hover:bg-[#414066] hover:dark:bg-white`} href={item.url}>{item.title}</a>
            </Show>
          )}
        </For>
      </ul>
    </nav>

    // <div class="w-full min-w-36 flex flex-col">
    //   <a
    //     class={`flex justify-between items-center gap-2 text-lg hover:text-purple ${isActive() && "text-purple"}`}
    //     onClick={(e) => {
    //       e.preventDefault();
    //       setIsActive(!isActive());
    //       navigate(isActive() ? props.data.url : props.data.url.slice(0, (props.data.url).lastIndexOf("/")));
    //     }}
    //     href={(props.data.url)}
    //     >
    //     {props.data.title}
    //     <Icon
    //       name="BiSolidRightArrow"
    //       class={`${isActive() && "rotate-90"} size-3 transition-transform`}
    //     />
    //   </a>
    //   <div class={`${isActive() ? "h-full" : "h-0"} ml-2 flex flex-col gap-1 overflow-hidden transition-[height] duration-200`}>
    //     <For each={props.data.items}>
    //       {(item) => (
    //         <Show when={item.type == "resources"} fallback={<Accordion data={item} />}>
    //           <a class={`hover:text-purple ${(path() == item.url) && "text-purple"}`} href={item.url}>{item.title}</a>
    //         </Show>
    //       )}
    //     </For>
    //   </div>
    // </div>
  );
}
