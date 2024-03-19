import Header from 'layout/header';
import Footer from 'layout/footer';
import SideBar from 'components/sidebar';
import DataProvider from 'context';

export default function App(props: any) {
  return (
  <div class="lg:h-screen">
    <Header/>
    <div class="flex md:gap-8 mx-8">
      <DataProvider>
        <SideBar/>
        {props.children}
      </DataProvider>
      <Footer/>
    </div>
  </div>
  );
}