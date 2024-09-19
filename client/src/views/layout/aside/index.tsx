import { A } from "@solidjs/router";
import Icon from "components/ui/icon";
import SwitchTheme from "components/widgets/switchTheme";

function Aside() {
  return (
    <aside class="md:h-[5vh] flex justify-end items-center px-4 bg-gray-300 dark:bg-zinc-900 md:bg-transparent md:dark:bg-transparent">
      <span class="flex gap-2">
        <A class="max-md:hidden w-full flex justify-center items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700" activeClass="bg-gray-100 dark:bg-zinc-700" href="/favorites">
          <Icon name="FaRegularBookmark"/>Favorites
        </A>
        <SwitchTheme />
      </span>
    </aside>
  )
}

export default Aside;