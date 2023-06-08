import type { Component } from 'solid-js';
import { Router, Routes, Route } from '@solidjs/router';

import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";

const App: Component = () => {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Main category="menu" />} />
          <Route path="/menu/cursos" element={<Main category="cursos" />} />
          <Route path="/menu/tutoriais" element={<Main category="tutoriais" />} />
          <Route path="/menu/video-tutoriais" element={<Main category="video tutoriais" />} />
          <Route path="/menu/frameworks" element={<Main category="frameworks" />} />
          <Route path="/menu/editores-de-codigo" element={<Main category="editores de codigo" />} />
          <Route path="/menu/extensoes" element={<Main category="extensoes" />} />
          <Route path="/menu/paleta-de-cores" element={<Main category="paleta de cores" />} />
          <Route path="/menu/bibliotecas-de-icones" element={<Main category="bibliotecas de icones" />} />
          <Route path="/menu/bibliotecas-de-fontes" element={<Main category="biblioteca de fontes" />} />
          <Route path="/menu/plataformas-de-edicao" element={<Main category="plataformas de edicao" />} />
          <Route path="/menu/cms" element={<Main category="cms" />} />
          <Route path="/menu/jogos-de-programacao" element={<Main category="jogos de programacao" />} />
          <Route path="/menu/servicos-de-hospedagem" element={<Main category="servicos de hospedagem" />} />
          <Route path="/menu/foruns" element={<Main category="foruns" />} />
          <Route path="/menu/busca-de-vagas" element={<Main category="busca de vagas" />} />
          <Route path="/menu/canais-de-tecnologia" element={<Main category="canais de tecnologia" />} />
          <Route path="/menu/blogs-de-tecnologia" element={<Main category="blogs de tecnologia" />} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;
