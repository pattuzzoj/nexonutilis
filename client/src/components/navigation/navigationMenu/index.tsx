import { createSignal, For } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { useData } from "context/DataContext";

interface NavigationMenuItemProps {
  depth: number;
}

function NavigationMenuItem(props: NavigationMenuItemProps) {
  const navigate = useNavigate();
  const path = () => useLocation().pathname;
  const initialState = () => path().startsWith(props.url);
  const [isOpen, setIsOpen] = createSignal<boolean>(initialState());

  return (
    <></>
  )
}

function NavigationMenu() {
  const {data} = useData();

  return (
    <For each={data}>
      {(item) => <NavigationMenuItem/>}
    </For>
  )
}

export default NavigationMenu;