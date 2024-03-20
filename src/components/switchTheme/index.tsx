import { Show } from "solid-js";
import Icon from "components/icon";
import useTheme from "theme";

export default function SwitchTheme() {
  const [theme, setTheme] = useTheme();
  
  return (
    <span class="flex items-center">
      <Show when={theme() == "light"} fallback={
        <button title="Dark Mode" class="inline-block rounded-full dark:text-black" onClick={() => setTheme("light")}>
          <Icon name="FiMoon" class="inline-block fill-yellow-500  stroke-yellow-500 size-6"/>
        </button>
      }>
        <button title="Light Mode" class="inline-block rounded-full dark:text-black" onClick={() => setTheme("dark")}>
          <Icon name="FiSun" class="inline-block fill-yellow-500 stroke-yellow-500 size-6"/>
        </button>
      </Show>
    </span>
  );
}