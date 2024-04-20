import { lazy } from 'solid-js';

const Home = lazy(() => import('../pages/menu'));
const Saved = lazy(() => import('../pages/saved'));
const Form = lazy(() => import('../pages/form'));

export const routes = [
  {
    path: "/form",
    component: Form,
  },
  {
    path: "/saved",
    component: Saved,
  },
  {
    path: ["*"],
    component: Home,
  }
];