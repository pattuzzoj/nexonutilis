import { A } from "@solidjs/router";

export default function Navegation() {
  return (
    <nav class="navegation">
      <button aria-label="header Button" id="navegation__menu-toggle" class="navegation__menu-toggle"></button>

      <menu id="navegation__menu-list" class="navegation__menu-list">
				<li class="navegation__menu-item"><A class="navegation__menu-link" activeClass="navegation__menu-link_active" href="/home">Home</A></li>
        <li class="navegation__menu-item"><A class="navegation__menu-link" activeClass="navegation__menu-link_active" href="/contact">Contact</A></li>
        <li class="navegation__menu-item"><A class="navegation__menu-link" activeClass="navegation__menu-link_active" href="/about">About</A></li>
      </menu>
    </nav>
  );
}