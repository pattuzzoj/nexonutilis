import Header from 'layout/header';
import Footer from 'layout/footer';
import DataProvider from 'context';
import Aside from 'layout/aside';

export default function App(props: any) {
  return (
    <div class="flex flex-col md:flex-row">
      <DataProvider>
        <Header />
        <div class="w-full flex flex-col justify-between">
            <Aside />
            {props.children}
          <Footer />
        </div>
      </DataProvider>
    </div>
  );
}