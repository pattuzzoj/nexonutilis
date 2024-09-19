import { Show } from "solid-js";
import Icon from "components/ui/icon";
import useTheme from "theme";

function SwitchTheme() {
  const [theme, setTheme] = useTheme();
  
  return (
    <Show when={theme() == "light"} fallback={
      <button title="Dark Mode" class="inline-block rounded-lg p-2 hover:scale-90 hover:bg-zinc-900 dark:hover:bg-zinc-700" onClick={() => setTheme("light")}>
        <Icon name="FiMoon" class="text-white size-5"/>
      </button>
    }>
      <button title="Light Mode" class="inline-block rounded-lg p-2 hover:scale-90 hover:bg-slate-400 dark:hover:bg-zinc-700" onClick={() => setTheme("dark")}>
        <Icon name="FiSun" class="text-black size-5"/>
      </button>
    </Show>
  );
}

export default SwitchTheme;