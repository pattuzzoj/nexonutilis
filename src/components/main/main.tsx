import { For } from "solid-js";
import Card from "../card/card";

const cardsData: { [key: string]: any } = {
  "menu": [{title: "Cursos", description: "Recursos educacionais estruturados para aprender novas habilidades e conceitos.", "url": "/menu/cursos", "hreflang": ""},
  {title: "Tutoriais", description: "Guias passo a passo para auxiliar no aprendizado e na resolução de problemas específicos.", "url": "/menu/tutoriais", "hreflang": ""},
  {title: "Video Tutoriais", description: "Vídeos interativos que demonstram visualmente conceitos e técnicas de programação.", "url": "/menu/video-tutoriais", "hreflang": ""},
  {title: "Frameworks", description: "Ferramentas para simplificar o desenvolvimento de aplicativos em uma área específica da programação.", "url": "/menu/frameworks", "hreflang": ""},
  {title: "Editores de Codigo", description: "Ferramentas essenciais para escrever e editar código de forma eficiente.", "url": "/menu/editores-de-codigo", "hreflang": ""},
  {title: "Extensoes", description: "Adições personalizáveis para ampliar as funcionalidades dos editores de código e navegadores.", "url": "/menu/extensoes", "hreflang": ""},
  {title: "Paleta de Cores", description: "Conjunto de cores organizadas para auxiliar no design e na escolha de esquemas de cores.", "url": "/menu/paleta-de-cores", "hreflang": ""},
  {title: "Bibliotecas de Icones", description: "Coleções de ícones prontos para uso em interfaces de usuário e projetos de design.", "url": "/menu/bibliotecas-de-icones", "hreflang": ""},
  {title: "Biblioteca de Fontes", description: "Repositórios de fontes tipográficas para escolher estilos de texto distintos.", "url": "/menu/bibliotecas-de-fontes", "hreflang": ""},
  {title: "Plataformas de Edicao", description: "Ambientes que permitem a criação e edição de designs gráficos, como imagens, ilustrações e layouts de página.", "url": "/menu/plataformas-de-edicao", "hreflang": ""},
  {title: "Plataformas de Treinamento", description: "Ambientes que permitem o treinamento e resolução de exercícios lógicos e de programação.", "url": "/menu/plataformas-de-treinamento", "hreflang": ""},
  {title: "Jogos de Programacao", description: "Jogos interativos que ensinam conceitos de programação de forma divertida e prática.", "url": "/menu/jogos-de-programacao", "hreflang": ""},
  {title: "CMS", description: "Sistemas de Gerenciamento de Conteúdo que facilitam a criação e a manutenção de websites.", "url": "/menu/cms", "hreflang": ""},
  {title: "Servicos de Hospedagem", description: "Plataformas que permitem publicar e disponibilizar websites e aplicativos na Internet.", "url": "/menu/servicos-de-hospedagem", "hreflang": ""},
  {title: "Foruns", description: "Comunidades online onde desenvolvedores podem discutir e obter suporte em tópicos específicos.", "url": "/menu/foruns", "hreflang": ""},
  {title: "Busca de Vagas", description: "Ferramentas para encontrar oportunidades de emprego e estágio na área de tecnologia.", "url": "/menu/busca-de-vagas", "hreflang": ""},
  {title: "Canais de Tecnologia", description: "Canais de vídeo e podcasts que abordam temas relacionados à tecnologia e programação.", "url": "/menu/canais-de-tecnologia", "hreflang": ""},
  {title: "Blogs de Tecnologia", description: "Blogs informativos e atualizados que compartilham notícias e artigos sobre tecnologia.", "url": "/menu/blogs-de-tecnologia", "hreflang": ""},
],

  "cursos": 
  [{"CardID":"1","category":"cursos","title":"Alura","description":"Sequências de cursos organizados em Formações · Programação. Arquitetura e Design de Projetos Java · Arquitetura PHP · Front-end. Acessibilidade Web etc.","url":"https://www.alura.com.br/","hreflang":"pt"},
  {"CardID":"2","category":"cursos","title":"Curso em Video","description":"","url":"https://www.cursoemvideo.com/","hreflang":"pt"},
  {"CardID":"3","category":"cursos","title":"EBAC","description":"A EBAC (Escola Britânica de Artes Criativas e Tecnologia) é um centro de educação inovador que oferece ensino online nas áreas de Design, Programação & Data, Audiovisual, Games, Marketing, Software e ","url":"https://ebaconline.com.br/","hreflang":"pt"},
  {"CardID":"4","category":"cursos","title":"Fundação Bradesco","description":"","url":"https://www.ev.org.br/","hreflang":"pt"},
  {"CardID":"5","category":"cursos","title":"Udemy","description":"","url":"https://www.udemy.com/","hreflang":"pt"},],

  "tutoriais": 
  [{"CardID":"1","category":"tutoriais","title":"Freecodecamp","description":"Nossa missão: ajudar as pessoas a aprender a codificar gratuitamente.","url":"https://www.freecodecamp.org/learn","hreflang":"en"},
  {"CardID":"2","category":"tutoriais","title":"Javascript.info","description":"Tutorial JavaScript moderno, explicações simples e atualizadas.","url":"https://javascript.info/","hreflang":"en"},
  {"CardID":"3","category":"tutoriais","title":"Mozzila","description":"O site MDN Web Docs fornece informações sobre tecnologias da Web Aberta, incluindo HTML CSS e APIs para sites da Web e aplicativos web progressivos.","url":"https://developer.mozilla.org/pt-BR/","hreflang":"pt"},
  {"CardID":"4","category":"tutoriais","title":"Tutorialspoint","description":"Biblioteca de Tutoriais Online - O Melhor Conteúdo sobre tecnologias mais recentes, incluindo C, C++, Java, Python, PHP, Machine Learning, Data Science...","url":"https://www.tutorialspoint.com/index.htm","hreflang":"en"},
  {"CardID":"5","category":"tutoriais","title":"Tutsplus","description":"Atualizado diariamente, descubra mais de 20750 Tutoriais de como fazer. Encontre vídeos e cursos online para ajudá-lo a aprender habilidades como código, fotografia, web design e muito mais!","url":"https://tutsplus.com/","hreflang":"en"},
  {"CardID":"6","category":"tutoriais","title":"W3School","description":"O W3Schools é otimizado para aprendizado, testes e treinamento. Exemplos podem ser simplificados para melhorar a leitura e a compreensão básica.","url":"https://www.w3schools.com/","hreflang":"en"},
  {"CardID":"7","category":"tutoriais","title":"PHP Tutorial","description":"Bem-vindo ao tutorial PHP moderno! Este tutorial php ajuda você a aprender como desenvolver sites dinâmicos e aplicativos web usando PHP do zero.","url":"https://www.phptutorial.net/","hreflang":"en"},
  {"CardID":"8","category":"tutoriais","title":"SQL Tutorial","description":"Este tutorial SQL ajuda você a começar com SQL de forma rápida e eficaz através de muitos exemplos práticos.","url":"https://www.sqltutorial.org/","hreflang":"en"},
  {"CardID":"9","category":"tutoriais","title":"Python Tutorial","description":"Este tutorial python ajuda você a aprender programação Python do zero. Se você quiser dominar a programação python rapidamente, este tutorial python é para você.","url":"https://www.pythontutorial.net/","hreflang":"en"},
  {"CardID":"10","category":"tutoriais","title":"JavaScript Tutorial","description":"Bem-vindo ao site JavaScriptTutorial.net! Este Tutorial JavaScript ajuda você a aprender a linguagem de programação JavaScript do zero de forma rápida e eficaz.","url":"https://www.javascripttutorial.net/","hreflang":"en"},
  {"CardID":"11","category":"tutoriais","title":"TypeScript Tutorial","description":"TypeScript é Typed JavaScript. O TypeScript adiciona tipos ao JavaScript para ajudá-lo a acelerar o desenvolvimento capturando erros antes mesmo de executar o código JavaScript.","url":"https://www.typescripttutorial.net/","hreflang":"en"},
  {"CardID":"12","category":"tutoriais","title":"MySQL Tutorial","description":"Este site fornece-lhe com um completo tutorial MySQL apresentado em um fácil de seguir de forma.","url":"https://www.mysqltutorial.org/mysql-basics/","hreflang":"en"},
  {"CardID":"13","category":"tutoriais","title":"PostGreeSQL Tutorial","description":"Você vai dominar o PostgreSQL muito rápido através de muitos exemplos práticos e aplicar o conhecimento no desenvolvimento de aplicativos usando PostgreSQL.","url":"https://www.postgresqltutorial.com/","hreflang":"en"},],

  "video tutoriais": 
  [{"CardID":"1","category":"video tutoriais","title":"Curso em Vídeo","description":"","url":"https://www.youtube.com/c/CursoemVídeo","hreflang":"pt"},
  {"CardID":"2","category":"video tutoriais","title":"Chief of Design","description":"","url":"https://www.youtube.com/c/Chiefofdesign/playlists","hreflang":"pt"},
  {"CardID":"3","category":"video tutoriais","title":"CGB Cursos","description":"","url":"https://www.youtube.com/c/cfbcursos/videos","hreflang":"pt"},
  {"CardID":"4","category":"video tutoriais","title":"Escola Front-End","description":"","url":"https://www.youtube.com/c/EscolaFrontend/videos","hreflang":"pt"},
  {"CardID":"5","category":"video tutoriais","title":"Node Studio Treiname","description":"","url":"https://www.youtube.com/c/NodeStudioTreinamentos/playlists","hreflang":"pt"},
  {"CardID":"6","category":"video tutoriais","title":"Dev School","description":"","url":"https://www.youtube.com/c/DevSchoolDIEGO","hreflang":"pt"},
  {"CardID":"7","category":"video tutoriais","title":"RocketSeat","description":"","url":"https://www.rocketseat.com.br/","hreflang":"pt"},],

  "frameworks": 
  [{"CardID":"1","category":"frameworks","title":"React.js","description":"Uma biblioteca JavaScript para construir interfaces de usuário interativas e reutilizáveis.","url":"https://react.dev/","hreflang":"en"},
  {"CardID":"2","category":"frameworks","title":"Solid.js","description":"Uma biblioteca JavaScript para construir interfaces de usuário interativas e reutilizáveis.","url":"https://www.solidjs.com/","hreflang":"en"},
  {"CardID":"3","category":"frameworks","title":"Express.js","description":"Um framework web rápido e minimalista para construir aplicativos web em Node.js.","url":"https://expressjs.com/pt-br/","hreflang":"en"},
],

  "editores de codigo": 
  [{"CardID":"1","category":"Editores de Código","title":"Brackets","description":"Traduzido do inglês-Brackets é um editor de código fonte com foco principal em desenvolvimento web.","url":"https://brackets.io/","hreflang":"en"},
  {"CardID":"2","category":"Editores de Código","title":"Sublime Text","description":"Sublime Text é um editor de código-fonte multi-plataforma e shareware com uma interface de programação de aplicativos para a linguagem Python.","url":"https://www.sublimetext.com/","hreflang":"en"},
  {"CardID":"3","category":"Editores de Código","title":"Visual Studio Code","description":"O Visual Studio Code é um editor de código-fonte desenvolvido pela Microsoft para Windows, Linux e macOS.","url":"https://code.visualstudio.com/","hreflang":"en"},],

  "extensoes": 
  [{"CardID":"1","category":"Extensões","title":"Accessibility Insigh","description":"","url":"https://chrome.google.com/webstore/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni","hreflang":"en"},
  {"CardID":"2","category":"Extensões","title":"Checkbot: SEO, Web S","description":"","url":"https://chrome.google.com/webstore/detail/checkbot-seo-web-speed-se/dagohlmlhagincbfilmkadjgmdnkjinl","hreflang":"en"},
  {"CardID":"3","category":"Extensões","title":"ColorZilla","description":"","url":"https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp","hreflang":"en"},
  {"CardID":"4","category":"Extensões","title":"Lighthouse","description":"","url":"https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=pt-br","hreflang":"en"},
  {"CardID":"5","category":"Extensões","title":"Outliner CSS","description":"","url":"https://chrome.google.com/webstore/detail/outliner-css/epodomlablfiehjgajhlhbdhidlkokaj?hl=pt-br","hreflang":"en"},
  {"CardID":"6","category":"Extensões","title":"WAVE Evaluation Tool","description":"","url":"https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh","hreflang":"en"},],

  "paleta de cores": 
  [{"CardID":"1","category":"Paletas de Cores","title":"Adobe Color","description":"O principal objetivo do programa é tornar mais simples e prático o processo de criação e escolha das paletas de cores utilizadas em diferentes projetos.","url":"https://color.adobe.com/pt/create/color-wheel","hreflang":"pt"},
  {"CardID":"2","category":"Paletas de Cores","title":"Coolors","description":"","url":"https://coolors.co/","hreflang":"en"},
  {"CardID":"3","category":"Paletas de Cores","title":"HTML Color Code","description":"","url":"https://htmlcolorcodes.com/","hreflang":"en"},
  {"CardID":"4","category":"Paletas de Cores","title":"ColorSpace","description":"","url":"https://mycolor.space/","hreflang":"en"},
  {"CardID":"5","category":"Paletas de Cores","title":"Palettable","description":"","url":"https://www.palettable.io","hreflang":"en"},
  {"CardID":"6","category":"Paletas de Cores","title":"UiGradients","description":"","url":"https://uigradients.com/","hreflang":"en"},
  {"CardID":"7","category":"Paletas de Cores","title":"WebGradients","description":"","url":"https://webgradients.com/","hreflang":"en"},],

  "bibliotecas de icones": 
  [{"CardID":"1","category":"Bibliotecas de Ícones","title":"Flaticon","description":"","url":"https://www.flaticon.com/","hreflang":"en"},
  {"CardID":"2","category":"Bibliotecas de Ícones","title":"IconFinder","description":"","url":"https://www.iconfinder.com/","hreflang":"en"},
  {"CardID":"3","category":"Bibliotecas de Ícones","title":"Google Icons","description":"","url":"https://fonts.google.com/icons?selected=Material+Icons:filter_alt","hreflang":"en"},
  {"CardID":"4","category":"Bibliotecas de Ícones","title":"Remix Icon","description":"","url":"https://remixicon.com/","hreflang":"en"},],

  "biblioteca de fontes": 
  [{"CardID":"1","category":"Bibliotecas de Fontes","title":"Dafont","description":"","url":"https://www.dafont.com/pt/","hreflang":"pt"},
  {"CardID":"2","category":"Bibliotecas de Fontes","title":"Font Space","description":"","url":"https://www.fontspace.com/","hreflang":"en"},
  {"CardID":"3","category":"Bibliotecas de Fontes","title":"Font Squirrel","description":"","url":"https://www.fontsquirrel.com/","hreflang":"en"},
  {"CardID":"4","category":"Bibliotecas de Fontes","title":"Google  Fonts","description":"","url":"https://fonts.google.com/","hreflang":"en"},],

  "plataformas de edicao": 
  [{"CardID":"1","category":"plataformas de edição","title":"Adobe XD","description":"","url":"https://www.adobe.com/br/products/xd.html","hreflang":"pt"},
  {"CardID":"2","category":"plataformas de edição","title":"Crello","description":"Crello é uma plataforma de design online com o objetivo de automatizar a criação de conteúdo de marketing.","url":"https://crello.com/pt/","hreflang":"pt"},
  {"CardID":"3","category":"plataformas de edição","title":"Figma","description":"Figma é um editor gráfico de vetor e prototipagem de projetos de design baseado principalmente no navegador web, com ferramentas offline adicionais para aplicações desktop para GNU/Linux, macOS e Wind","url":"https://www.figma.com/","hreflang":"en"},
  {"CardID":"4","category":"plataformas de edição","title":"Sketch","description":"Sketch é um editor de gráficos vetoriais para macOS desenvolvido pela empresa holandesa Sketch B.V.","url":"https://www.sketch.com/","hreflang":"en"},],

  "plataformas de treinamento": [
    {"CardID":"1","category":"plataformas de treinamento","title":"beecrowd","description":"Plataforma de treinamento em programação competitiva com desafios e competições, ajudando a desenvolver habilidades em algoritmos e estruturas de dados.","url":"https://www.beecrowd.com.br/judge/pt/login","hreflang":"pt"},
    {"CardID":"2","category":"plataformas de treinamento","title":"LeetCode","description":"Plataforma popular de treinamento em programação com uma extensa coleção de problemas de codificação, ideal para aprimorar habilidades técnicas e se preparar para entrevistas.","url":"https://leetcode.com/","hreflang":"en"},
    {"CardID":"3","category":"plataformas de treinamento","title":"HackerRank","description":"Uma das principais plataformas de treinamento em programação, oferecendo desafios, competições e a oportunidade de aprender várias linguagens de programação.","url":"https://www.hackerrank.com/","hreflang":"en"},
    {"CardID":"4","category":"Plataforma de treinamento","title":"CoderByte","description":"Plataforma de treinamento em programação que combina desafios práticos e tutoriais interativos, abrangendo desde conceitos básicos até tópicos avançados de desenvolvimento de software.","url":"https://coderbyte.com/","hreflang":"en"},
  ],
  
  "jogos de programacao": 
  [
    { "CardID": "1", "category": "Jogos de Programação", "title": "Code Combat", "description": "Code Combat é um jogo de programação que ensina os fundamentos da codificação através de desafios interativos. Aprenda a linguagem de programação enquanto enfrenta batalhas épicas em um ambiente de fantasia.", "url": "https://br.codecombat.com/home", "hreflang": "en"},
    { "CardID": "2", "category": "Jogos de Programação", "title": "Grid Garden", "description": "Grid Garden é um jogo que ensina CSS Grid de forma divertida. Cultive seu jardim de CSS e aprenda os conceitos básicos do CSS Grid.", "url": "https://cssgridgarden.com/", "hreflang": "en"},
    { "CardID": "3", "category": "Jogos de Programação", "title": "Flexbox Froggy", "description": "Flexbox Froggy é um jogo que ensina Flexbox, uma técnica de layout em CSS. Ajude as rãs a encontrarem seus lugares no lago, aplicando os conceitos do Flexbox.", "url": "https://flexboxfroggy.com", "hreflang": "en"},
    { "CardID": "4", "category": "Jogos de Programação", "title": "CSS Diner", "description": "CSS Diner é um jogo que ensina seletores CSS. Sirva pratos deliciosos aplicando os seletores corretos para atender aos pedidos dos clientes.", "url": "https://flukeout.github.io/", "hreflang": "en"},
    {"CardID": "5","category": "Jogos de Programação","title": "Flexbox Zombies","description": "Flexbox Zombies é um jogo que ensina Flexbox através de um cenário pós-apocalíptico de zumbis. Sobreviva aos zumbis aplicando técnicas de layout com Flexbox.","url": "https://mastery.games/flexboxzombies/","hreflang": "en"},
    {"CardID": "6","category": "Jogos de Programação","title": "CheckIO","description": "CheckIO é uma plataforma que combina jogos e desafios de programação. Melhore suas habilidades de codificação resolvendo problemas e desafios reais.","url": "https://checkio.org/","hreflang": "en"},
    {"CardID": "7","category": "Jogos de Programação","title": "Codingame","description": "Codingame é uma plataforma que oferece uma variedade de desafios e jogos de programação em várias linguagens. Aperfeiçoe suas habilidades de codificação enquanto se diverte.","url": "https://www.codingame.com/","hreflang": "en"},
  ],
  
  "cms": 
  [{"CardID":"1","category":"CMS","title":"Ghost","description":"O Ghost é uma plataforma de blogs gratuita e de código aberto escrita em JavaScript e distribuída sob a licença MIT, projetada para simplificar o processo de publicação online para blogueiros individu","url":"https://ghost.org/","hreflang":"en"},
  {"CardID":"2","category":"CMS","title":"Joomla","description":"Joomla! é um sistema livre open source de gestão de conteúdo web desenvolvido em PHP e com base de dados MySQL, executado em um servidor interpretador.","url":"https://www.joomla.org/","hreflang":"en"},
  {"CardID":"3","category":"CMS","title":"Textpattern","description":"Traduzido do inglês-Textpattern é um sistema de gerenciamento de conteúdo gratuito e de código aberto para PHP e MySQL. Foi originalmente desenvolvido por Dean Allen e agora desenvolvido pela Team Tex","url":"https://textpattern.com/","hreflang":"en"},
  {"CardID":"4","category":"CMS","title":"Wordpress","description":"WordPress é um sistema livre e aberto de gestão de conteúdo para internet, baseado em PHP com banco de dados MySQL, executado em um servidor interpretador, voltado principalmente para a criação de pág","url":"https://br.wordpress.org/","hreflang":"pt"},],

  "servicos de hospedagem": 
  [{"CardID":"1","category":"Serviços de Hospedagem","title":"000webhost","description":"","url":"https://br.000webhost.com/","hreflang":"pt"},
  {"CardID":"2","category":"Serviços de Hospedagem","title":"Hostinger","description":"Hostinger International, Ltd é um provedor de Hospedagem Web de propriedade de funcionários e registrador de domínio na Internet, estabelecido em 2004. A Hostinger é a empresa-mãe da 000Webhost, Niaga","url":"https://www.hostinger.com.br/?utm_medium=affiliate&utm_source=aff28575&utm_campaign=296&session=1027","hreflang":"en"},
  {"CardID":"3","category":"Serviços de Hospedagem","title":"Infinity Free","description":"","url":"https://infinityfree.net/","hreflang":"en"},
  {"CardID": "4", "category": "Serviços de Hospedagem", "title": "AwardSpace", "description": "Hospedagem gratuita com suporte para PHP, MySQL e construtor de sites.", "url": "https://www.awardspace.com/", "hreflang": "en"},
  {"CardID": "5", "category": "Serviços de Hospedagem", "title": "Freehosting.com", "description": "Hospedagem gratuita com 10 GB de espaço em disco, suporte a PHP e MySQL, e construtor de sites.", "url": "https://www.freehosting.com/", "hreflang": "en"},
  { "CardID": "6", "category": "Serviços de Hospedagem", "title": "x10hosting", "description": "Hospedagem gratuita com suporte a PHP, MySQL, cPanel e construtor de sites.", "url": "https://x10hosting.com/", "hreflang": "en"},
  { "CardID": "7", "category": "Serviços de Hospedagem", "title": "Vercel", "description": "Plataforma de hospedagem para aplicativos estáticos e JAMstack. Oferece escalabilidade e integração com Git.", "url": "https://vercel.com/", "hreflang": "en"},
  { "CardID": "8", "category": "Serviços de Hospedagem", "title": "W3 Space", "description": "Hospedagem gratuita com suporte a PHP, MySQL e construtor de sites. Oferece domínio gratuito.", "url": "https://w3space.net/", "hreflang": "en"},],
  
  "foruns": 
  [{"CardID":"1","category":"Fóruns","title":"GitHub","description":"","url":"https://github.community/","hreflang":"en"},
  {"CardID":"2","category":"Fóruns","title":"iMasters","description":"","url":"https://forum.imasters.com.br/","hreflang":"pt"},
  {"CardID":"3","category":"Fóruns","title":"Stack Overflow","description":"","url":"https://pt.stackoverflow.com/","hreflang":"pt"},],

  "busca de vagas": 
  [{"CardID":"1","category":"Busca de Vagas","title":"Catho","description":"","url":"https://www.catho.com.br/","hreflang":"pt"},
  {"CardID":"2","category":"Busca de Vagas","title":"Codefreela","description":"","url":"https://codefreela.com/","hreflang":"pt"},
  {"CardID":"3","category":"Busca de Vagas","title":"GeekHunter","description":"","url":"https://www.geekhunter.com.br/","hreflang":"pt"},
  {"CardID":"4","category":"Busca de Vagas","title":"Glassdoor","description":"","url":"https://www.glassdoor.com.br/index.htm","hreflang":"pt"},
  {"CardID":"5","category":"Busca de Vagas","title":"Indeed","description":"","url":"https://br.indeed.com/","hreflang":"pt"},
  {"CardID":"6","category":"Busca de Vagas","title":"InfoJobs","description":"","url":"https://www.infojobs.com.br/","hreflang":"pt"},
  {"CardID":"7","category":"Busca de Vagas","title":"Programa Thor","description":"","url":"https://programathor.com.br/","hreflang":"pt"},],

  "canais de tecnologia": 
  [{"CardID":"1","category":"Canais de Tecnologia","title":"Attekita Dev","description":"","url":"https://www.youtube.com/c/AttekitaDev/videos","hreflang":"pt"},
  {"CardID":"2","category":"Canais de Tecnologia","title":"Código Fonte TV","description":"","url":"https://www.youtube.com/c/codigofontetv","hreflang":"pt"},
  {"CardID":"3","category":"Canais de Tecnologia","title":"Diolinux","description":"","url":"https://www.youtube.com/user/Diolinux","hreflang":"pt"},
  {"CardID":"4","category":"Canais de Tecnologia","title":"Filipe Deschamps","description":"","url":"https://www.youtube.com/channel/UCU5JicSrEM5A63jkJ2QvGYw","hreflang":"pt"},
  {"CardID":"5","category":"Canais de Tecnologia","title":"Programador BR","description":"","url":"https://www.youtube.com/c/Programadorbr","hreflang":"pt"},],

  "blogs de tecnologia": 
  [{"CardID":"1","category":"Blogs de Tecnologia","title":"Tableless","description":"","url":"https://tableless.com.br/","hreflang":"pt"},
  {"CardID":"2","category":"Blogs de Tecnologia","title":"GitHub","description":"","url":"https://github.blog/","hreflang":"en"},],
}

export default function Main(context: {category: string}) {
  const cards = cardsData[context.category]

  return (
    <main class="main">
      <For each={cards}>
        {(card) => {
          return <Card title={card.title} description={card.description} url={card.url} hreflang={card.hreflang} />
        }}
      </For>
    </main>
  )
}