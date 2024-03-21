import { Show } from 'solid-js';
import useSwitch from 'hooks/useSwitch';
import Icon from "components/icon";
import Title from "components/typography/title";
import Menu from "components/menu";

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useSwitch<boolean>(true);

  return (
    <header class={`${menuIsOpen() ? "min-w-64 py-6 px-4" : "-translate-x-full w-0"} relative h-[5vh] md:h-screen flex justify-between items-center md:items-stretch md:flex-col bg-gray-300 dark:bg-gray-800 transition-all ease-in duration-300`}>
      <button onClick={() => setMenuIsOpen(!menuIsOpen())} class="hidden md:block absolute bottom-2 left-[105%]">
        <Show when={menuIsOpen()} fallback={<Icon name="RiSystemMenuUnfoldLine" class="size-8"/>}>
          <Icon name="RiSystemMenuFoldLine" class="size-8"/>
        </Show>
      </button>
      <Title as="1" class="md:h-[10%] overflow-hidden"><a class="flex items-center gap-2 font-extralight text-gray-900 dark:text-white" href="/"><Icon name="FaBrandsConnectdevelop" class="size-8" /> Nexon Utilis</a></Title>
      <Menu />
      <div class="md:h-[10%] flex flex-col justify-end overflow-hidden">
        <a class="group w-full flex items-center gap-2 p-2 dark:hover:text-[#414066] hover:text-white hover:bg-gray-400 dark:hover:bg-white rounded" href="/saved"><Icon name="FaRegularBookmark" class="group-hover:text-white"/> Saved</a>
      </div>
    </header>
  );
}