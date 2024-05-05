import DataProvider from "context";
import Header from "components/layout/header";
import Footer from "components/layout/footer";
import Aside from "components/layout/aside";
import Main from "components/layout/main";

export default function App(props: any) {
  return (
    <div class="relative flex flex-col md:h-screen">
      <DataProvider>
        <div class="flex flex-col md:flex-row">
          <Header />
          <div class="flex w-full flex-col">
            <Aside />
            <Main class="rounded-s-2xl bg-gray-300 text-gray-900 dark:bg-zinc-900 dark:text-white">
              {props.children}
            </Main>
          </div>
        </div>
        <Footer />
      </DataProvider>
    </div>
  );
}
