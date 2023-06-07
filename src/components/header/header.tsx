import Navegation from '../navegation/navegation';

export default function Header() {
  return (
    <header class="header">
      <a aria-label="Empíreo" class="header__logo" href="/"></a>

      <Navegation />

      <button aria-label="Theme Button" id="switch-theme" class="switch-theme"></button>
    </header>
  )
}