import { Show } from 'solid-js';
import useSwitch from 'hooks/useSwitch';
import Icon from "components/icon";
import Title from "components/typography/title";
import Menu from "components/menu";
import Logo from "assets/icons/logo.svg";

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useSwitch<boolean>(true);

  return (
    <header class={`${menuIsOpen() ? "min-w-64 py-6 px-4 md:border-r-2" : "-translate-x-full w-0"} relative transition-all h-[5vh] md:h-screen flex justify-between items-center md:items-stretch md:flex-col border-gray-900 bg-[#2c2c54] dark:bg-[#414066] text-white`}>
      <button onClick={() => setMenuIsOpen(!menuIsOpen())} class="hidden md:block absolute bottom-2 left-[105%]">
        <Show when={menuIsOpen()} fallback={<Icon name="RiSystemMenuUnfoldLine" class="size-8"/>}>
          <Icon name="RiSystemMenuFoldLine" class="size-8"/>
        </Show>
      </button>
      <Title as="1" class="md:h-[10%] overflow-hidden"><a class="flex items-center gap-2" href="/"><img class="size-8" src={Logo} alt="" /> Nexon Utilis</a></Title>
      <Menu />
      <div class="md:h-[10%] flex flex-col justify-end overflow-hidden">
        <a class="w-full flex items-center gap-2 p-2 dark:hover:text-[#414066] bg-[#414066] dark:hover:bg-white rounded" href="/saved"><Icon name="FaRegularBookmark"/> Saved</a>
      </div>
    </header>
  );
}