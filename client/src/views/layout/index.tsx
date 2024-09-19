import { createEffect, createSignal, Show } from "solid-js";
import { RouteSectionProps} from "@solidjs/router";
import Header from "./header";
import Aside from "./aside";
import Main from "./main";
import Footer from "./footer";
import Icon from "components/ui/icon";
import DataProvider from "context/DataContext";

interface LayoutProps extends RouteSectionProps {}

function Layout(props: LayoutProps) {
  const [isOpen, setIsOpen] = createSignal(true);
  const [isLoading, setIsLoading] = createSignal(true);

  setTimeout(() => setIsLoading(false), 1000);

  createEffect(() => {
    setTimeout(() => setIsOpen(false), 1500);
  });

  return (
    <DataProvider>
      <Show when={isOpen()}>
        <div class={`${!isLoading() && "scale-0"} absolute top-0 left-0 z-20 h-full w-full flex justify-center items-center text-white bg-zinc-800 transition-all duration-700`}>
          <Icon name="FaBrandsConnectdevelop" class="size-12 animate-spin duration-300"/>
        </div>
      </Show>
      <div class="h-screen w-full flex flex-col md:flex-row">
        <Header />
        <div class="w-full">
          <Aside />
          <Main>
            {props.children}
          </Main>
          <Footer />
        </div>
      </div>
    </DataProvider>
  )
}

export default Layout;