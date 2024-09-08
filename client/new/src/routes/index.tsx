import { lazy } from "solid-js";

const routes = [
  {
    path: ['', '/', '/home'],
    component: lazy(() => import('views/pages/home')),
  },
  {
    path: "/saved",
    component: lazy(() => import('views/pages/saved')),
  },
  {
    path: "*0",
    component: lazy(() => import('views/pages/404')),
  }
]

export default routes;