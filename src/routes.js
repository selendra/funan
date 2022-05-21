import Index from "./pages";
import About from "./pages/about";
import Home from "./pages/home";
import Wallet from "./pages/wallet";
import Receive from "./pages/wallet/receive";
import Send from "./pages/wallet/send";

const routes = [
  {
    path: '/',
    element: <Index />
  },
  {
    path: 'home',
    element: <Home />
  },
  {
    path: 'wallet',
    element: <Wallet />
  },
  {
    path: 'wallet/send',
    element: <Send />
  },
  {
    path: 'wallet/receive',
    element: <Receive />
  },
  {
    path: 'about',
    element: <About />
  },
]

export default routes;