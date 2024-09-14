import { Show } from "solid-js";
import Icon from "components/ui/icon";
import useTheme from "theme";

function SwitchTheme() {
  const [theme, setTheme] = useTheme();
  
  return (
    <Show when={theme() == "light"} fallback={
      <button title="Dark Mode" class="inline-block rounded-lg size-6" onClick={() => setTheme("light")}>
        <Icon name="FiMoon" class="text-white"/>
      </button>
    }>
      <button title="Light Mode" class="inline-block rounded-lg size-6" onClick={() => setTheme("dark")}>
        <Icon name="FiSun" class="text-black"/>
      </button>
    </Show>
  );
}

export default SwitchTheme;