import { Accessor, Setter, createEffect } from 'solid-js';
import useLocalStorage from 'hooks/useLocalStorage';
import { HTML } from '../utils/constants'

type Theme = "light" | "dark";

export default function useTheme(): [Accessor<Theme>, Setter<Theme>] {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "dark");
  
  createEffect(() => {HTML.setAttribute("data-theme", theme());});
  
  window.addEventListener("storage", themeUpdateListener);
  
  function themeUpdateListener(event: StorageEvent) {
    if (event.key == "theme" && event.newValue != null && event.newValue != theme()) {
      setTheme(event.newValue as Theme);
    }
  }
  
  return [theme, setTheme];
}