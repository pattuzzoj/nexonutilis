import Navigation from "components/navigation";
import SwitchTheme from "components/switchTheme";

export default function Aside() {
  return (
    <aside class="h-[5vh] flex justify-between items-center px-4 bg-transparent">
      <Navigation />
      <div class="hidden md:block">
        <SwitchTheme />
      </div>
    </aside>
  );
}