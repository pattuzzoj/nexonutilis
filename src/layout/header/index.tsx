import { Show } from "solid-js";
import { A } from "@solidjs/router";
import Icon from "components/ui/icon";
import useTheme from 'theme';
import {useTranslator, useLanguage} from "i18n";
import Logo from "components/ui/logo";
import portuguese from "assets/icons/flags/brazil.svg";
import english from "assets/icons/flags/english.svg";
import spanish from "assets/icons/flags/spain.svg";
import useSwitch from 'hooks/useSwitch';

export default function Header() {
  const [theme, setTheme] = useTheme();
  const [menuIsOpen, setMenuIsOpen] = useSwitch<boolean>(false);
  const [menuLanguageisOpen, setMenuLanguageIsOpen] = useSwitch<boolean>(false);
  const t = useTranslator("global.header");
  const [lang, setLang] = useLanguage();
  const flags = {"pt": portuguese, "en": english, "es": spanish};

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
          <Logo class="size-1.5 fill-white" />
          Nexon Utilis
        </a>
      </span>

      <nav class="
      max-md:hidden
      flex justify-center gap-1
      "
      >
        <A class="hover:text-purple" activeClass="text-purple" href="/saved" end>Saved</A>
        <A class="hover:text-purple" activeClass="text-purple" href="/careers" end>{t("menu.careers")}</A>
        <A class="hover:text-purple" activeClass="text-purple" href="/blogs" end>{t("menu.blogs")}</A>
        <A class="hover:text-purple" activeClass="text-purple" href="/pricing" end>{t("menu.pricing")}</A>
      </nav>

      <span class="w-60 hidden md:flex justify-end items-center gap-1">
        <A class="max-md:hidden rounded-full text-white bg-purple p-1 px-3" href="/contact" end>{t("menu.contact")}</A>
        <span class="font-black text-purple">&nbsp;|&nbsp;</span>
        <span class="flex items-center gap-1">
          <span class="relative">
            <span class="flex items-center">
              <button
                class=""
                onClick={() => setMenuLanguageIsOpen(!menuLanguageisOpen())}
              >
                <img class="size-8" src={flags[lang()]} alt="" />
              </button>
              <div
                class={`${menuLanguageisOpen() ? "flex" : "hidden"} absolute left-50 -translate-x-50 top-100 w-12 flex-col items-center gap-0 rounded-lg bg-dark p-2 dark:bg-white`}
              >
                <button
                  title="Portuguese"
                  class={`${flags[lang()].includes("/br") && "hidden"}`}
                  onClick={() => {
                    setLang("pt");
                    setMenuLanguageIsOpen(!menuLanguageisOpen());
                  }}
                >
                  <img class="size-8" src={flags['pt']} alt="" />
                </button>
                <button
                  title="English"
                  class={`${flags[lang()].includes("/en") && "hidden"}`}
                  onClick={() => {
                    setLang("en");
                    setMenuLanguageIsOpen(!menuLanguageisOpen());
                  }}
                >
                  <img class="size-8" src={flags['en']} alt="" />
                </button>
                <button
                  title="Spanish"
                  class={`${flags[lang()].includes("/sp") && "hidden"}`}
                  onClick={() => {
                    setLang("es");
                    setMenuLanguageIsOpen(!menuLanguageisOpen());
                  }}
                >
                  <img class="size-8" src={flags['es']} alt="" />
                </button>
              </div>
            </span>
          </span>
          <Show
            when={theme() == "light"} fallback={
              <button title="dark" class="hidden md:inline-block rounded-full bg-dark dark:bg-white dark:text-black" onClick={() => setTheme("light")}>
                <Icon class="inline-block fill-yellow-500  stroke-yellow-500 size-5" name="FiMoon"/>
              </button>
            }>
            <button title="light" class="hidden md:inline-block rounded-full bg-dark dark:bg-white dark:text-black" onClick={() => setTheme("dark")}>
              <Icon class="inline-block fill-yellow-500 stroke-yellow-500 size-5" name="FiSun"/>
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
          <span class={`${menuLanguageisOpen() && "bg-white dark:bg-dark"} relative flex items-center rounded-lg p-1 transition-none`}>
            <button
              class=""
              onClick={() => setMenuLanguageIsOpen(!menuLanguageisOpen())}
            >
              <img class="size-8.5" src={flags[lang()]} alt="" />
            </button>
            <div
              class={
                `${menuLanguageisOpen() ? "flex" : "hidden"}
                absolute top-[78%] left-50 -translate-x-50 w-100
                flex-col items-center gap-0
                rounded-lg p-1 bg-white dark:bg-dark
                `}
            >
              <button
                title="Portuguese"
                class={`${flags[lang()].includes("/br") && "hidden"}`}
                onClick={() => {
                  setLang("pt");
                  setMenuLanguageIsOpen(!menuLanguageisOpen());
                }}
              >
                <img class="size-8.5" src={flags['pt']} alt="" />
              </button>
              <button
                title="English"
                class={`${flags[lang()].includes("/en") && "hidden"}`}
                onClick={() => {
                  setLang("en");
                  setMenuLanguageIsOpen(!menuLanguageisOpen());
                }}
              >
                <img class="size-8.5" src={flags['en']} alt="" />
              </button>
              <button
                title="Spanish"
                class={`${flags[lang()].includes("/sp") && "hidden"}`}
                onClick={() => {
                  setLang("es");
                  setMenuLanguageIsOpen(!menuLanguageisOpen());
                }}
              >
                <img class="size-8.5" src={flags['es']} alt="" />
              </button>
            </div>
          </span>
          <a class="
          flex items-center justify-center
          p-1 px-3
          dark:rounded-full
          text-3xl
          text-white dark:text-black
          " href="/">
            <Logo class="size-8.5 fill-white dark:fill-black" />
            FutureSphere
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
          <A class="text-xl hover:text-purple" activeClass="text-purple" href="/about" end>{t("menu.about")}</A>
          <A class="text-xl hover:text-purple" activeClass="text-purple" href="/careers" end>{t("menu.careers")}</A>
          <A class="text-xl hover:text-purple" activeClass="text-purple" href="/blogs" end>{t("menu.blogs")}</A>
          <A class="text-xl hover:text-purple" activeClass="text-purple" href="/pricing" end>{t("menu.pricing")}</A>
          <A class="text-xl hover:text-purple" activeClass="text-purple" href="/pricing" end>{t("menu.contact")}</A>
        </nav>
        <span class="flex flex-col items-center gap-0.5 w-full">
          <a class="w-full text-center rounded-full px-1.25 py-0.375 text-white bg-purple" href="/login">{t("ui.login")}</a>
          <a class="w-full text-center rounded-full px-1.25 py-0.375 text-black dark:text-white bg-white dark:bg-dark" href="/signup">{t("ui.signup")}</a>
        </span>
      </div>
    </header>
  );
}
