import { For, Match, Switch, createSignal } from "solid-js";
import Icon from "components/icon";
import Main from "layout/main";
import useSwitch from "hooks/useSwitch";


export default function Form() {
  const [type, setType] = useSwitch<string>("categories");
  const [_isOpen, _setIsOpen] = useSwitch<boolean>(false);

  const [_info, _setInfo] = createSignal({});
  const [_list, _setList] = createSignal({});

  async function fazerRequisicao() {
    try {
      const resposta = await fetch('https://nexonutilis-server.vercel.app/categories', {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'no-cors'
      }); // Faz a requisição // Converte a resposta para JSON
  
      // Manipula os dados conforme necessário
      console.log('Resposta:', resposta);
    } catch (erro) {
      console.error(erro);
    }
  }
  
  // Chama a função para fazer a requisição
  fazerRequisicao();


  const lista = [
    {
      "id": 101,
      "type": "category",
      "title": "Desenvolvimento Web",
      "description": "Esta categoria abrange todos os aspectos do desenvolvimento web, incluindo HTML, CSS, JavaScript, frameworks front-end e back-end, entre outros. Aqui você encontrará recursos para aprender e aprimorar suas habilidades em desenvolvimento web.",
      "url": "https://www.exemplo.com/categorias/desenvolvimento-web",
      "icon": "icone_desenvolvimento_web.png",
      "logo": "logo_desenvolvimento_web.png",
      "official": "https://www.exemplo.com/oficial",
      "roadmap": "https://www.exemplo.com/roadmap",
      "position": 1,
      "category_url": "desenvolvimento-web"
    },
    {
      "id": 202,
      "type": "resource",
      "title": "Guia Completo de CSS Flexbox",
      "description": "Este guia abrangente explora todos os aspectos do layout flexível em CSS. Aprenda como usar flexbox para criar layouts responsivos e dinâmicos para seus projetos web.",
      "url": "https://www.exemplo.com/recursos/guia-completo-css-flexbox",
      "icon": "icone_css_flexbox.png",
      "logo": "logo_css_flexbox.png",
      "official": "https://www.exemplo.com/oficial",
      "roadmap": "https://www.exemplo.com/roadmap",
      "position": 2,
      "category_url": "desenvolvimento-web"
    },
    {
      "id": 303,
      "type": "category",
      "title": "Inteligência Artificial",
      "description": "Esta categoria explora os fundamentos e aplicações da inteligência artificial (IA). Aprenda sobre algoritmos de aprendizado de máquina, redes neurais, processamento de linguagem natural (PLN), visão computacional e muito mais.",
      "url": "https://www.exemplo.com/categorias/inteligencia-artificial",
      "icon": "icone_inteligencia_artificial.png",
      "logo": "logo_inteligencia_artificial.png",
      "official": "https://www.exemplo.com/oficial",
      "roadmap": "https://www.exemplo.com/roadmap",
      "position": 3,
      "category_url": "inteligencia-artificial"
    },
    {
      "id": 303,
      "type": "category",
      "title": "Inteligência Artificial",
      "description": "Esta categoria explora os fundamentos e aplicações da inteligência artificial (IA). Aprenda sobre algoritmos de aprendizado de máquina, redes neurais, processamento de linguagem natural (PLN), visão computacional e muito mais.",
      "url": "https://www.exemplo.com/categorias/inteligencia-artificial",
      "icon": "icone_inteligencia_artificial.png",
      "logo": "logo_inteligencia_artificial.png",
      "official": "https://www.exemplo.com/oficial",
      "roadmap": "https://www.exemplo.com/roadmap",
      "position": 3,
      "category_url": "inteligencia-artificial"
    },
    {
      "id": 303,
      "type": "category",
      "title": "Inteligência Artificial",
      "description": "Esta categoria explora os fundamentos e aplicações da inteligência artificial (IA). Aprenda sobre algoritmos de aprendizado de máquina, redes neurais, processamento de linguagem natural (PLN), visão computacional e muito mais.",
      "url": "https://www.exemplo.com/categorias/inteligencia-artificial",
      "icon": "icone_inteligencia_artificial.png",
      "logo": "logo_inteligencia_artificial.png",
      "official": "https://www.exemplo.com/oficial",
      "roadmap": "https://www.exemplo.com/roadmap",
      "position": 3,
      "category_url": "inteligencia-artificial"
    }   
  ]

  return (
    <Main>
      <p>{"afasfa"}</p>
      <span class="flex gap-4">
        <button class={`${type() == "categories" && "bg-gray-500"} p-2 rounded-lg hover:bg-gray-500 text-lg`} onClick={() => setType("categories")}>Categories</button>
        <button class={`${type() == "resources" && "bg-gray-500"} p-2 rounded-lg hover:bg-gray-500 text-lg`} onClick={() => setType("resources")}>Resources</button>
      </span>
      <table>
        <Switch>
          <Match when={type() == "categories"}>
            <caption class="mb-4 font-semibold text-xl">Categories</caption>
          </Match>
          <Match when={type() == "resources"}>
            <caption class="mb-4 font-semibold text-xl">Resources</caption>
          </Match>
        </Switch>
        <thead>
          <tr>
            <th class="pb-2">ID</th>
            <th class="pb-2">Type</th>
            <th class="pb-2 text-start">Title</th>
            <th class="pb-2 text-start">URL</th>
            <th class="pb-2 text-start">Category URL</th>
            <th class="pb-2">Position</th>
            <th class="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <For each={lista}>
            {item => (
              <tr class="rounded-lg odd:bg-gray-500 h-10 align-middle">
                <td class="text-center">{item.id}</td>
                <td class="text-center">{item.type}</td>
                <td class="text-start">{item.title}</td>
                <td class="text-start">{item.url}</td>
                <td class="text-start">{item.category_url}</td>
                <td class="text-center">{item.position}</td>
                <td>
                  <span class="flex justify-center gap-2">
                    <button class="text-lg"><Icon name="FiInfo"/></button>
                    <button class="text-lg"><Icon name="FiEdit"/></button>
                    <button class="text-lg"><Icon name="FiTrash"/></button>
                  </span>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </Main>
  );
}
