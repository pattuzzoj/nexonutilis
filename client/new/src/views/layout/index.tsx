import { RouteSectionProps } from "@solidjs/router";
import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import Aside from "./aside";

interface LayoutProps extends RouteSectionProps {}

function Layout(props: LayoutProps) {
  return (
    <div class="min-h-screen flex flex-col justify-between">
      <Header />
      <Aside />
      <Main>
        {props.children}
      </Main>
      <Footer />
    </div>
  )
}

export default Layout;