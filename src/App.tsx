import type { Component } from 'solid-js';
import { Router } from '@solidjs/router';

import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";

const App: Component = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
