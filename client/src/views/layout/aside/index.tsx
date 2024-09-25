import { createSignal, Show } from "solid-js";
import { A } from "@solidjs/router";
import { createBreakpoints } from "@solid-primitives/media";
import SearchBar from "components/form/searchBar";
import Icon from "components/ui/icon";
import NavigationMenu from "components/navigation/navigationMenu";

function Aside() {
  const [menuIsOpen, setMenuIsOpen] = createSignal<boolean>(false);
  const matches = createBreakpoints({md: "768px"});
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen());

    if(!matches.md) {
      document.body.classList.toggle("overflow-hidden");
    }
  }
  
  return (
    <Show when={matches.md} fallback={
      <aside class="sticky bottom-0 left-0 z-20 w-screen flex justify-around bg-primary">
        <A href="/" class="w-1/3 flex flex-col items-center p-4 bg-primary hover:bg-hover font-medium" title="Home">
          <Icon name="FiHome" class="size-6"/>
        </A>
        <button class="w-1/3 flex flex-col items-center p-4 bg-primary hover:bg-hover font-medium" title="Search" onClick={() => toggleMenu()}>
          <Icon name="FaSolidMagnifyingGlass" class="size-6"/>
        </button>
        <A href="/favorites" class="w-1/3 flex flex-col items-center p-4 bg-primary hover:bg-hover font-medium" title="Favorites">
          <Icon name="FaRegularBookmark" class="size-6"/>
        </A>
        <div class={`${menuIsOpen() ? "h-screen opacity-100 backdrop-blur" : "h-0 opacity-0 translate-y-full overflow-hidden"} w-full absolute bottom-full left-0 z-10 flex flex-col-reverse items-center duration-500`}>
          <div class="h-fit max-h-[70vh] w-[95vw] flex flex-col gap-2 p-4 rounded-t-2xl bg-secondary">
            <SearchBar />
            <div class="h-full overflow-y-scroll">
              <NavigationMenu />
            </div>
          </div>
        </div>
      </aside>
    }>
      <aside class="min-w-64 flex flex-col justify-between md:py-4 bg-secondary">
        <div class="flex-1">
          <SearchBar />
          <br />
          <div class="basis-10/12 max-h-[70vh] overflow-y-scroll">
            <NavigationMenu />
          </div>
        </div>
        <A class="w-full flex justify-center items-center gap-2 p-2 rounded-lg hover:text-hover bg-primary hover:bg-hover active:bg-active" activeClass="text-accent bg-accent" href="/favorites">
          <Icon name="FaRegularBookmark"/>Favorites
        </A>
        {/* <button class={`absolute top-[50%] left-full -translate-y-[50%] z-30 text-3xl p-2 rounded-xl dark:hover:bg-zinc-700 hover:scale-90`} onClick={() => toggleMenu()}>
          <Icon name="RiSystemMenuUnfoldLine" class={`${menuIsOpen() ? "scale-100 h-full" : "scale-0 h-0 duration-0"}`}/>
          <Icon name="RiSystemMenuFoldLine" class={`${!menuIsOpen() ? "scale-100 h-full" : "scale-0 h-0 duration-0"}`}/>
        </button> */}
      </aside>
    </Show>
  )
}

export default Aside;