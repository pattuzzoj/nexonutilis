import { createSignal } from "solid-js";
import SwitchTheme from "components/widgets/switchTheme";
import Icon from "components/ui/icon";

function Header() {
  const [menuIsOpen, setMenuIsOpen] = createSignal<boolean>(false);

  return (
    <header class="h-[5vh] md:min-w-64">
      <span class="md:hidden">
        <SwitchTheme />
      </span>
      <a class="flex items-center gap-2" href="">
        <Icon name="FaBrandsConnectdevelop" class="size-7"/>
        Nexon Utilis
      </a>
      <div>
        
      </div>
      <a class="w-full flex justify-center md:justify-start items-center gap-2 p-2 rounded-lg" href="/saved">
        <Icon name="FaRegularBookmark"/>
        Saved
      </a>
    </header>
  )
}

export default Header;