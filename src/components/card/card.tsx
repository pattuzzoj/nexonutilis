import { A } from "@solidjs/router";

export default function Card(info: {title: string, description: string, url: string, hreflang: string}) {
  return (
    <div class="card">
      <div class="card__container">
        <h3 class="card__title">{info.title}</h3>
        <div class="card__template">
          <p class="card__description">{info.description}</p>
          <A class="card__link" href={info.url} hreflang={info.hreflang}>Acessar</A>
        </div>
      </div>
    </div>
  );
}