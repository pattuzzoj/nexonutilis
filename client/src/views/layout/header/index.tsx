import { createSignal, Show } from "solid-js";
import SwitchTheme from "components/widgets/switchTheme";
import Icon from "components/ui/icon";
import NavigationMenu from "components/navigation/navigationMenu";
import SearchBar from "components/form/searchBar";
import { A } from "@solidjs/router";
import { createBreakpoints } from "@solid-primitives/media";

function Header() {
  const [menuIsOpen, setMenuIsOpen] = createSignal<boolean>(false);
  const matches = createBreakpoints({md: "768px"});
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen());

    if(!matches.md) {
      document.body.classList.toggle("overflow-hidden");
    }
  }

  return (
    <>
    <header
    class={`${menuIsOpen() ? "md:absolute md:top-0 md:-left-0 md:-translate-x-full max-md:h-full" : "md:p-4"} "
    md:relative max-md:mb-14 md:bg-zinc-900
    "`}>
      <div class={`${(menuIsOpen() && matches.md) && "w-0 overflow-hidden"} h-full md:flex md:flex-col md:justify-between md:gap-4`}>
        <div class={`${menuIsOpen() && "overflow-x-hidden"} fixed top-0 left-0 z-20 md:static h-14 w-full md:min-w-64 flex justify-between md:justify-center items-center px-2 bg-zinc-900`}>
          <A class="flex items-center gap-2 text-xl md:text-2xl p-2 rounded-xl dark:hover:bg-zinc-700 hover:scale-90" href="/">
            <Icon name="FaBrandsConnectdevelop"/>
            Nexon Utilis
          </A>
          <Show when={!matches.md}>
            <button class=" text-xl p-2 rounded-xl dark:hover:bg-zinc-700 hover:scale-90" onClick={() => toggleMenu()}>
              <Icon name="CgClose" class={`${menuIsOpen() ? "visible opacity-100 scale-100 h-full" : "invisible opacity-0 scale-0 h-0 duration-0"}`}/>
              <Icon name="RiSystemMenu2Line" class={`${!menuIsOpen() ? "visible opacity-100 scale-100 h-full" : "invisible opacity-0 scale-0 h-0 duration-0"}`}/>
            </button>
          </Show>
        </div>
        <Show when={matches.md} fallback={
          <div class={`${menuIsOpen() ? "visible opacity-100 translate-y-0 backdrop-blur" : "invisible opacity-0 translate-y-full"} h-full w-full fixed bottom-0 left-0 z-10 flex flex-col-reverse items-center duration-500`}>
            <div class="h-2/3 w-[95vw] flex flex-col gap-2 p-4 rounded-t-2xl bg-zinc-900">
              <span class="h-[10%]">
                <SearchBar />
              </span>
              <div class="h-[80%]">
                <NavigationMenu />
              </div>
              <span class="h-10%">
                <A class="w-full flex justify-center items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700" activeClass="bg-gray-100 dark:bg-zinc-700" href="/favorites">
                  <Icon name="FaRegularBookmark"/>Favorites
                </A>
              </span>
            </div>
          </div>
        }>
          <SearchBar />
          <div class="h-[85%]">
            <NavigationMenu />
          </div>
          <A class="md:hidden w-full flex justify-center items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700" activeClass="bg-gray-100 dark:bg-zinc-700" href="/favorites">
            <Icon name="FaRegularBookmark"/>Favorites
          </A>
        </Show>
      </div>
      <Show when={matches.md}>
        <button class={`${menuIsOpen() ? "-left-full" : "left-full"} absolute top-[0%] -translate-y-[00%] z-20 text-3xl p-2 rounded-xl dark:hover:bg-zinc-700 hover:scale-90`} onClick={() => toggleMenu()}>
          <Icon name="RiSystemMenuUnfoldLine" class={`${menuIsOpen() ? "scale-100 h-full" : "scale-0 h-0 duration-0"}`}/>
          <Icon name="RiSystemMenuFoldLine" class={`${!menuIsOpen() ? "scale-100 h-full" : "scale-0 h-0 duration-0"}`}/>
        </button>
      </Show>
    </header>
    <span class="absolute top-0 left-0 invisible">
      <SwitchTheme />
    </span>
    </>
  )
}

export default Header;