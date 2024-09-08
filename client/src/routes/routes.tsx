import { lazy } from 'solid-js';

const Menu = lazy(() => import('../pages/menu'));
const Saved = lazy(() => import('../pages/saved'));
const NotFound = lazy(() => import('../pages/404'));

export const routes = [
  {
    path: "/saved",
    component: Saved,
  },
  {
    path: ["*"],
    component: Menu,
  },
  {
    path: "/404",
    component: NotFound,
  }
];