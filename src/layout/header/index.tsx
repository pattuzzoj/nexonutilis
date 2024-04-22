import { Show } from 'solid-js';
import useSwitch from 'hooks/useSwitch';
import Icon from "components/icon";
import Title from "components/typography/title";
import Menu from "components/menu";
import Search from 'components/search';
import SwitchTheme from 'components/switchTheme';

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useSwitch<boolean>(false);

  return (
    <header class="relative h-[5vh] md:h-[95vh] md:min-w-64 flex md:flex-col justify-between items-stretch gap-4 px-4">
      <div class="self-center md:hidden">
        <SwitchTheme /> 
      </div>
      <div class="h-[5vh] flex items-center">
        <Title as='1' class="text-center">
          <a class="flex items-center gap-2 font-light dark:text-white" href="/">
            <Icon name="FaBrandsConnectdevelop" class="size-7"/>
            Nexon Utilis
          </a>
        </Title>
      </div>
      <div class={`${!menuIsOpen() && "scale-0 md:scale-100"} h-[90vh] md:h-full w-full flex flex-col justify-between gap-4 absolute top-full left-0 z-10 md:static mt-4 px-4 md:px-0 bg-gray-200/80 dark:bg-zinc-800/80`}>
        <div class="flex flex-col gap-4">
          <Search />
          <Menu />
        </div>
        <a class="w-full flex justify-center md:justify-start items-center gap-2 p-2 hover:text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700" href="/saved">
          <Icon name="FaRegularBookmark"/>Saved
        </a>
      </div>
      <button class="md:hidden" onClick={() => setMenuIsOpen(!menuIsOpen())}>
        <Show when={menuIsOpen()} fallback={<Icon name="TbMenu2" class="size-6"/>}>
          <Icon name="CgClose" class="size-6"/>
        </Show>
      </button>
    </header>
  );

  return (
    <header class="relative h-[5vh] md:h-[95vh] md:min-w-64 flex md:flex-col justify-between items-center md:items-stretch px-4">
      <div class="md:hidden">
        <SwitchTheme />
      </div>
      <div class="h-[5vh] flex items-center">
        <Title as='1' class="text-center">
          <a class="flex items-center gap-2 font-light dark:text-white" href="/">
            <Icon name="FaBrandsConnectdevelop" class="size-7"/>
            Nexon Utilis
          </a>
        </Title>
      </div>
      <div class={`${!menuIsOpen() && "scale-0 md:scale-100"} h-[90vh] w-full flex flex-col justify-center p-4 md:p-0 absolute top-full left-0 z-10 md:static mt-4 transition-transform duration-300 bg-gray-200 dark:bg-zinc-800`}>
        <div class="flex flex-col gap-4 h-full">
          <Search />
          <div class="overflow-y-auto">
            <Menu />
          </div>
        </div>
        <a class="group h-[5vh] w-full flex justify-center md:justify-start items-center gap-2 p-2 hover:text-sm rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all" href="/saved"><Icon name="FaRegularBookmark"/> Saved</a>
      </div>
      <button class="md:hidden" onClick={() => setMenuIsOpen(!menuIsOpen())}>
        <Show when={menuIsOpen()} fallback={<Icon name="TbMenu2" class="size-6"/>}>
          <Icon name="CgClose" class="size-6"/>
        </Show>
      </button>
    </header>
  );
}