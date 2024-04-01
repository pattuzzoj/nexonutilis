import { Show } from "solid-js";
import Icon from "components/icon";
import useTheme from "theme";

export default function SwitchTheme() {
  const [theme, setTheme] = useTheme();
  
  return (
    <Show when={theme() == "light"} fallback={
      <button title="Dark Mode" class="inline-block rounded-full dark:text-black" onClick={() => setTheme("light")}>
        <Icon name="FiMoon" class="inline-block size-6 text-white"/>
      </button>
    }>
      <button title="Light Mode" class="inline-block rounded-full dark:text-black" onClick={() => setTheme("dark")}>
        <Icon name="FiSun" class="inline-block size-6"/>
      </button>
    </Show>
  );
}