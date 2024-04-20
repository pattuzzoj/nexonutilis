import Header from 'layout/header';
import Footer from 'layout/footer';
import DataProvider from 'context';
import Aside from 'layout/aside';

export default function App(props: any) {
  return (
    <div class="md:h-screen flex flex-col">
      <DataProvider>
        <div class="flex flex-col md:flex-row">
          <Header />
          <div class="w-full flex flex-col">
            <Aside />
            {props.children}
          </div>
        </div>
        <Footer />
      </DataProvider>
    </div>
  );
}