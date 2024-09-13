import { Router } from '@solidjs/router';
import IndexedDBProvider from 'context/IndexedDB';
import routes from './routes';
import Layout from "views/layout";

export default function App() {
  const stores = [
    {
      name: "category",
      options: { keyPath: "id" },
      index: [{ name: "category_url", keyPath: "url"}]
    },
    {
      name: "resource",
      options: { keyPath: "id" },
      index: [{ name: "resource_category_id", keyPath: "category_id"}]
    }
  ];

  return (
    <IndexedDBProvider value={{name: "nexon", version: 1, stores}}>
      <Router root={Layout}>
        {routes}
      </Router>
    </IndexedDBProvider>
  );
}