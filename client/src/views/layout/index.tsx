import { RouteSectionProps} from "@solidjs/router";
import Header from "./header";
import Aside from "./aside";
import Main from "./main";
// import Footer from "./footer";
import DataProvider from "context/DataContext";

interface LayoutProps extends RouteSectionProps {}

function Layout(props: LayoutProps) {
  return (
    <DataProvider>
      <Header />
      <div class="
      h-full flex-1 flex
      flex-col justify-between
      md:flex-row-reverse md:justify-normal
      gap-4 md:px-4 bg-secondary
      ">
        <Main>
          {props.children}
        </Main>
        <Aside />
      </div>
    </DataProvider>
  )
}

export default Layout;