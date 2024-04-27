import Header from 'layout/header';
import Footer from 'layout/footer';
import DataProvider from 'context';
import Aside from 'layout/aside';
import Main from 'layout/main';

export default function App(props: any) {
  return (
    <div class="md:h-screen flex flex-col">
      <DataProvider>
        <div class="flex flex-col md:flex-row">
          <Header />
          <div class="w-full flex flex-col">
            <Aside />
            <Main class="rounded-s-2xl text-gray-900 dark:text-white bg-gray-300 dark:bg-zinc-900">
              {props.children}
            </Main>
          </div>
        </div>
        <Footer />
      </DataProvider>
    </div>
  );
}