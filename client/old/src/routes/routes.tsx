import { lazy } from 'solid-js';

const Menu = lazy(() => import('../pages/menu'));
const Saved = lazy(() => import('../pages/saved'));
const NotFound = lazy(() => import('../pages/404'));
const Form = lazy(() => import("../pages/form"));

export const routes = [
  {
    path: "/saved",
    component: Saved,
  },
  {
    path: "/form",
    component: Form,
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