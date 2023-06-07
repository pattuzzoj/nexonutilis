export default function Navegation() {
  return (
    <nav class="navegation">
      <button aria-label="header Button" id="menu__toggle" class="menu__toggle"></button>

      <menu id="menu__list" class="menu__list">
				<li class="menu__item"><a class="menu__link" href="/">Home</a></li>
        <li class="menu__item"><a class="menu__link" href="/">Contact</a></li>
        <li class="menu__item"><a class="menu__link" href="/">About</a></li>
      </menu>
    </nav>
  );
}