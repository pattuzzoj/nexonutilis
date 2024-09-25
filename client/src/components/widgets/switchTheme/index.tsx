import { Show } from "solid-js";
import Icon from "components/ui/icon";
import useTheme from "theme";

function SwitchTheme() {
  const [theme, setTheme] = useTheme();
  
  return (
    <Show when={theme() == "light"} fallback={
      <button title="Dark Mode" class="inline-block rounded-lg p-2 hover:text-hover hover:bg-hover active:bg-active hover:scale-90" onClick={() => setTheme("light")}>
        <Icon name="FiMoon" class="size-6"/>
      </button>
    }>
      <button title="Light Mode" class="inline-block rounded-lg p-2 hover:text-hover hover:bg-hover active:bg-active hover:scale-90" onClick={() => setTheme("dark")}>
        <Icon name="FiSun" class="size-6"/>
      </button>
    </Show>
  );
}

export default SwitchTheme;