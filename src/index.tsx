import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import routes from './routes';
import './index.css';
import App from './app';
import { inject } from "@vercel/analytics";

inject();

const root = document.getElementById('root');

render(() => (
    <Router root={App}>
      {routes}
    </Router>
), root!);