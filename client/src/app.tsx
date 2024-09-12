import { Router } from '@solidjs/router';
import routes from './routes';
import Layout from "views/layout";

export default function App() {
  return (
    <Router root={Layout}>
      {routes}
    </Router>
  );
}