import { render } from 'solid-js/web';
import App from './app';
import 'styles/index.css';
import { inject } from "@vercel/analytics";

inject();

const root = document.getElementById('root');

render(() => <App />, root!);