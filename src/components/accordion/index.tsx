import useSwitch from "hooks/useSwitch";
import { For, Show, createEffect, createMemo } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import Icon from "components/icon";

interface Props {
  data: any;
}

export default function Accordion(props: Props) {
  const location = useLocation();
  const path = () => location.pathname;
  const initialState = createMemo(() => path().startsWith(props.data.url));

  const [isActive, setIsActive] = useSwitch<boolean>(initialState());

  createEffect(() => path() && setIsActive(initialState()));

  const navigate = useNavigate();

  return (
    <div class="w-full min-w-36 flex flex-col">
      <a
        class={`flex justify-between items-center gap-2 text-lg hover:text-purple ${isActive() && "text-purple"}`}
        onClick={(e) => {
          e.preventDefault();
          setIsActive(!isActive());
          navigate(isActive() ? props.data.url : props.data.url.slice(0, (props.data.url).lastIndexOf("/")));
        }}
        href={(props.data.url)}
        >
        {props.data.title}
        <Icon
          name="BiSolidRightArrow"
          class={`${isActive() && "rotate-90"} size-3 transition-transform`}
        />
      </a>
      <div class={`${isActive() ? "h-full" : "h-0"} ml-2 flex flex-col gap-1 overflow-hidden transition-[height] duration-200`}>
        <For each={props.data.items}>
          {(item) => (
            <Show when={item.type == "resources"} fallback={<Accordion data={item} />}>
              <a class={`hover:text-purple ${(path() == item.url) && "text-purple"}`} href={item.url}>{item.title}</a>
            </Show>
          )}
        </For>
      </div>
    </div>
  );
}
