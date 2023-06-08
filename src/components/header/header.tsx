import { createEffect, createSignal } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function Header() {
  const dataTheme: Element | null = document.firstElementChild;
  
  function ApplyTheme(theme: string) {
    dataTheme?.setAttribute("data-theme", theme);
  }
  
  document.body.onload = () => {
    if (localStorage.getItem("theme") === "dark") {
      ApplyTheme("dark");
    }
    else {
        ApplyTheme("light");
    }
  }
  
  function SwitchTheme() {
    if (dataTheme?.getAttribute("data-theme") === "light") {
        ApplyTheme("dark");
        localStorage.setItem("theme", "dark");
    }
    else {
        ApplyTheme("light");
        localStorage.setItem("theme", "light");
    }
  }
  
  window.onstorage = event => {
    if (event.key === "theme") {
        if (event.newValue === "dark") {
            ApplyTheme("dark");
        }
        else {
            ApplyTheme("light");
        }
    }
  }

  const [showBackButton, setShowBackButton] = createSignal(false);

  createEffect(() => {
    setShowBackButton(useLocation().pathname.includes('/menu/'));
  });

  return (
    <header class="header">
      <a aria-label="Empíreo" class="header__logo" href="/">NEXON <u class="header__mark-logo">UTILIS</u></a>
      {showBackButton() && <A class="header__back_menu" href="/">Back</A>}
      <button aria-label="Theme Button" id="switch-theme" class="header__switch-theme" onClick={SwitchTheme}></button>
    </header>
  );
}