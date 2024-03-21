import Header from 'layout/header';
import Footer from 'layout/footer';
import DataProvider from 'context';
import Aside from 'layout/aside';

export default function App(props: any) {
  return (
    <div class="flex flex-col md:flex-row">
      <Header />
      <div class="md:w-4/6 xl:w-5/6 flex flex-col justify-between">
        <DataProvider>
          <Aside />
          {props.children}
        </DataProvider>
        <Footer />
      </div>
    </div>
  );
}