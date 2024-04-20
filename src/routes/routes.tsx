import { lazy } from 'solid-js';

const Home = lazy(() => import('../pages/menu'));
const Saved = lazy(() => import('../pages/saved'));

export const routes = [
  {
    path: "/saved",
    component: Saved,
  },
  {
    path: ["*"],
    component: Home,
  }
];