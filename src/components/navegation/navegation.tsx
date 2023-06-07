export default function Navegation() {
  return (
    <nav class="navegation">
      <button aria-label="header Button" id="navegation__menu-toggle" class="navegation__menu-toggle"></button>

      <menu id="navegation__menu-list" class="navegation__menu-list">
				<li class="navegation__menu-item"><a class="navegation__menu-link" href="/">Home</a></li>
        <li class="navegation__menu-item"><a class="navegation__menu-link" href="/">Contact</a></li>
        <li class="navegation__menu-item"><a class="navegation__menu-link" href="/">About</a></li>
      </menu>
    </nav>
  );
}