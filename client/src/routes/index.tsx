import { lazy } from "solid-js";

const routes = [
  {
    path: "/favorites",
    component: lazy(() => import('views/pages/favorites')),
  },
  {
    path: "/404",
    component: lazy(() => import('views/pages/404')),
  },
  {
    path: "*",
    component: lazy(() => import('views/pages/menu')),
  },
]

export default routes;