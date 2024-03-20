import Navigation from "components/navigation";
import SwitchTheme from "components/switchTheme";

export default function Aside() {
  return (
    <aside class="h-14 flex justify-between items-center px-2 md:px-3 border-b-2 border-[#2c2c54] border-opacity-70 dark:bg-[#414066]">
      <Navigation />
      <SwitchTheme />
    </aside>
  );
}