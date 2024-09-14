import { createSignal, Show } from "solid-js";
import SwitchTheme from "components/widgets/switchTheme";
import Icon from "components/ui/icon";
import NavigationMenu from "components/navigation/navigationMenu";
import SearchBar from "components/form/searchBar";
import { A } from "@solidjs/router";

function Header() {
  const [menuIsOpen, setMenuIsOpen] = createSignal<boolean>(false);

  return (
    <header class="relative h-[5vh] md:h-auto md:min-w-72 flex md:flex-col justify-between items-stretch gap-4 py-2 px-2">
      <div class="md:h-[5vh] w-full flex justify-between md:justify-center items-center px-4 max-md:bg-zinc-900 rounded-full">
        <Show when={menuIsOpen()}>
          <SwitchTheme />
        </Show>
        <a class="flex items-center gap-2 text-xl md:text-2xl dark:text-white" href="/">
          <Icon name="FaBrandsConnectdevelop" class="size-6"/>
          Nexon Utilis
        </a>
        <button class="md:hidden size-6" onClick={() => setMenuIsOpen(!menuIsOpen())}>
          <Show when={menuIsOpen()} fallback={<Icon name="RiSystemMenu2Line"/>}>
            <Icon name="CgClose" class="size-6"/>
          </Show>
        </button>
      </div>
      <div class={`${!menuIsOpen() && "scale-0 md:scale-100"} h-[90vh] md:h-full w-full flex flex-col justify-between gap-4 absolute top-full left-0 z-10 md:static mt-4 px-4 md:px-0 bg-gray-200/80 dark:bg-zinc-800/80`}>
        <div class="flex flex-col gap-4">
          <SearchBar />
          <NavigationMenu />
        </div>
        <span class="h-[5vh]">
          <A class="w-full flex justify-center items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700" activeClass="bg-gray-100 dark:bg-zinc-700" href="/saved">
            <Icon name="FaRegularBookmark"/>Saved
          </A>
        </span>
      </div>
    </header>
  )
}

export default Header;