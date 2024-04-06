import Navigation from "components/navigation";
import SwitchTheme from "components/switchTheme";

export default function Aside() {
  return (
    <aside class="h-[5vh] flex justify-between items-center px-4 bg-gray-300 dark:bg-gray-800">
      <Navigation />
      <SwitchTheme />
    </aside>
  );
}