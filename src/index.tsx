import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import routes from './routes';
import { MetaProvider } from '@solidjs/meta';
import './index.css';
import App from './app';

const root = document.getElementById('root');

render(() => (
  <MetaProvider>
    <Router root={App}>
      {routes}
    </Router>
  </MetaProvider>
), root!);