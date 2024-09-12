import Breadcrumb from "components/navigation/breadcrumb";
import SwitchTheme from "components/widgets/switchTheme";

function Aside() {
  return (
    <aside class="h-[5vh] flex justify-between items-center px-4 bg-gray-300 dark:bg-zinc-900 md:bg-transparent md:dark:bg-transparent">
      <Breadcrumb />
      <span class="hidden md:block">
        <SwitchTheme />
      </span>
    </aside>
  )
}

export default Aside;