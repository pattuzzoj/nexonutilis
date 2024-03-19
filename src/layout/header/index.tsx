import { Show } from "solid-js";
import { A } from "@solidjs/router";
import Icon from "components/icon";
import useTheme from 'theme';
import useSwitch from 'hooks/useSwitch';

export default function Header() {
  const [theme, setTheme] = useTheme();
  const [menuIsOpen, setMenuIsOpen] = useSwitch<boolean>(false);

  return (
    <header class="
    relative
    flex justify-between items-center
    m-4 mb-10 py-2 px-3 rounded-full
    text-white dark:text-black
    bg-dark dark:bg-white
    ">
      <span class="w-60">
        <a class="
        w-max
        flex items-center
        p-1 px-3
        rounded-full
        text-white dark:bg-dark
        " href="/">
          Nexon Utilis
        </a>
      </span>

      <nav class="
      max-md:hidden
      flex justify-center gap-1
      "
      >
        <A class="hover:text-purple" activeClass="text-purple" href="/saved" end>Saved</A>
        <A class="hover:text-purple" activeClass="text-purple" href="/careers" end></A>
        <A class="hover:text-purple" activeClass="text-purple" href="/blogs" end></A>
        <A class="hover:text-purple" activeClass="text-purple" href="/pricing" end></A>
      </nav>

      <span class="w-60 hidden md:flex justify-end items-center gap-1">
        <span class="flex items-center gap-1">
          <Show
            when={theme() == "light"} fallback={
              <button title="dark" class="hidden md:inline-block rounded-full bg-dark dark:bg-white dark:text-black" onClick={() => setTheme("light")}>
                <Icon class="inline-block fill-yellow-500  stroke-yellow-500 size-6" name="FiMoon"/>
              </button>
            }>
            <button title="light" class="hidden md:inline-block rounded-full bg-dark dark:bg-white dark:text-black" onClick={() => setTheme("dark")}>
              <Icon class="inline-block fill-yellow-500 stroke-yellow-500 size-6" name="FiSun"/>
            </button>
          </Show>
        </span>
      </span>

      <Show when={menuIsOpen() == true} fallback={
        <button class="md:hidden mr-1" onClick={() => setMenuIsOpen(!menuIsOpen())}>
          <Icon name="RiSystemMenu2Line" color="text-white dark:text-purple size-8" />
        </button>
      }>
        <button class="md:hidden mr-1" onClick={() => setMenuIsOpen(!menuIsOpen())}>
          <Icon color="text-purple size-8" name="FiX" />
        </button>
      </Show>

      <div class={`
      ${menuIsOpen() ? "flex" : "hidden"}
      flex-col justify-between items-center gap-2
      absolute top-[110%] right-0 z-10 w-100
      py-8 px-4 rounded-2xl
      bg-dark dark:bg-white
      `}>
        <span class="w-100 flex justify-between items-center">
          <a class="
          flex items-center justify-center
          p-1 px-3
          dark:rounded-full
          text-3xl
          text-white dark:text-black
          " href="/">
            Nexon Utilis
          </a>
          <Show
            when={theme() == "light"} fallback={
              <button title="dark" class="inline-block rounded-full dark:text-black" onClick={() => setTheme("light")}>
                <Icon class="inline-block fill-yellow-500  stroke-yellow-500 size-8.5" name="FiMoon"/>
              </button>
            }>
            <button title="light" class="inline-block rounded-full dark:text-black" onClick={() => setTheme("dark")}>
              <Icon class="inline-block fill-yellow-500 stroke-yellow-500 size-8.5" name="FiSun"/>
            </button>
          </Show>
        </span>
        <nav class="flex flex-col justify-center items-center gap-1.25 text-white dark:text-black">
          <A class="text-xl hover:text-purple" activeClass="text-purple" href="/about" end></A>
          <A class="text-xl hover:text-purple" activeClass="text-purple" href="/careers" end></A>
          <A class="text-xl hover:text-purple" activeClass="text-purple" href="/blogs" end></A>
          <A class="text-xl hover:text-purple" activeClass="text-purple" href="/pricing" end></A>
          <A class="text-xl hover:text-purple" activeClass="text-purple" href="/pricing" end></A>
        </nav>
        <span class="flex flex-col items-center gap-0.5 w-full">
          <a class="w-full text-center rounded-full px-1.25 py-0.375 text-white bg-purple" href="/login"></a>
          <a class="w-full text-center rounded-full px-1.25 py-0.375 text-black dark:text-white bg-white dark:bg-dark" href="/signup"></a>
        </span>
      </div>
    </header>
  );
}
