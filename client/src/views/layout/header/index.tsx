import Icon from "components/ui/icon";
import { A } from "@solidjs/router";
import SwitchTheme from "components/widgets/switchTheme";

function Header() {
  return (
    <header class="sticky top-0 left-0 z-30 h-14 md:h-[5vh] w-screen flex justify-between items-center px-2 bg-primary">
      <A class="flex items-center gap-2 text-xl p-2 rounded-xl hover:text-hover hover:scale-95" href="/">
        <Icon name="FaBrandsConnectdevelop" class="size-7"/>
        Nexon Utilis
      </A>
      <SwitchTheme />
    </header>
  )
}

export default Header;