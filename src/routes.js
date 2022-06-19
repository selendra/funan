import Index from "./pages";
import About from "./pages/about";
import Earn from "./pages/earn";
import Home from "./pages/home";
import Wallet from "./pages/wallet";
import Receive from "./pages/wallet/receive";
import Send from "./pages/wallet/send";
import NotFound from "./pages/notfound";
import SetupStaking from "./pages/earn/setupStaking";
import Setting from "./pages/settings";
import Connect from "./pages/connect";
import Sidebar from "./components/Sidebar";
import PageRouteAnimation from "./components/Animations/PageRoute";

import wallet from "./assets/sidebar-icons/wallet.svg";
import transfer from "./assets/sidebar-icons/transfer.svg";
import earn from "./assets/sidebar-icons/earn.svg";

const routes = [
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/home',
    name: 'Wallet',
    icon: wallet,
    element: (
      <Sidebar>
        <PageRouteAnimation key='home'>
          <Home />
        </PageRouteAnimation>
      </Sidebar>
    )
  },
  {
    path: '/wallet',
    name: 'Transfer',
    icon: transfer,
    element: (
      <Sidebar>
        <PageRouteAnimation key='wallet'>
          <Wallet />
        </PageRouteAnimation>
      </Sidebar>
    )
  },
  {
    path: 'wallet/send',
    element: (
      <Sidebar>
        <PageRouteAnimation key='wallet/send'>
          <Send />
        </PageRouteAnimation>
      </Sidebar>
    )
  },
  {
    path: 'wallet/receive',
    element: (
      <Sidebar>
        <PageRouteAnimation key='wallet/receive'>
          <Receive />
        </PageRouteAnimation>
      </Sidebar>
    )
  },
  {
    path: '/earn',
    name: 'Earn',
    icon: earn,
    element: (
      <Sidebar>
        <PageRouteAnimation key='earn'>
          <Earn />
        </PageRouteAnimation>
      </Sidebar>
    )
  },
  {
    path: '/earn/setup',
    element: (
      <Sidebar>
        <PageRouteAnimation key='earn'>
          <SetupStaking />
        </PageRouteAnimation>
      </Sidebar>
    )
  },
  {
    path: 'about',
    element: (
      <Sidebar>
        <PageRouteAnimation key='about'>
          <About />
        </PageRouteAnimation>
      </Sidebar>
    )
  },
  {
    path: 'settings',
    element: (
      <Sidebar>
        <PageRouteAnimation key='about'>
          <Setting />
        </PageRouteAnimation>
      </Sidebar>
    )
  },
  {
    path: 'connect',
    element: (
      <Sidebar>
        <PageRouteAnimation key='about'>
          <Connect />
        </PageRouteAnimation>
      </Sidebar>
    )
  },
  {
    path: '*',
    element: (
      <Sidebar>
        <NotFound />
      </Sidebar>
    )
  }
]

export { routes };