import { createEffect, createSignal, Show } from "solid-js";
import { RouteSectionProps } from "@solidjs/router";
import IndexedDBProvider from "context/IndexedDB";
import DataProvider from "context/DataContext";
import Header from "./header";
import Aside from "./aside";
import Main from "./main";
import Footer from "./footer";
import Icon from "components/ui/icon";

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

  const [isOpen, setIsOpen] = createSignal(true);
  const [isLoading, setIsLoading] = createSignal(true);
  setTimeout(() => setIsLoading(false), 1000);

  createEffect(() => {
    setTimeout(() => setIsOpen(false), 500);
  }, true);

  return (
    <div class="h-screen flex flex-col">
      <IndexedDBProvider value={{name: "nexon", version: 1, stores}}>
        <DataProvider>
          <div class="flex">
            <Show when={isOpen()}>
              <div class={`${!isLoading() && "scale-0"} absolute top-0 left-0 z-20 h-full w-full flex justify-center items-center text-white bg-zinc-800 transition-all duration-500`}>
                <Icon name="FaBrandsConnectdevelop" class="size-12 animate-spin duration-300"/>
              </div>
            </Show>
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