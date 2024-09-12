import { RouteSectionProps } from "@solidjs/router";
import IndexedDBProvider from "context/IndexedDB";
import DataProvider from "context/DataContext";
import Header from "./header";
import Aside from "./aside";
import Main from "./main";
import Footer from "./footer";

interface LayoutProps extends RouteSectionProps {}

function Layout(props: LayoutProps) {
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
    <div class="h-screen flex flex-col">
      <IndexedDBProvider value={{name: "nexon", version: 1, stores}}>
        <DataProvider>
          <div class="flex">
            <Header />
            <div class="w-full">
              <Aside />
              <Main>
                {props.children}
              </Main>
            </div>
          </div>
          <Footer />
        </DataProvider>
      </IndexedDBProvider>
    </div>
  )
}

export default Layout;