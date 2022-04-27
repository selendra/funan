import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/app.css";
import Auction from "./pages/auction";
import Connect from "./pages/connect";
import Home from "./pages/home";
import Exchange from "./pages/exchange";
import NotFound from "./pages/notfound";
import Bridge from "./pages/bridge";
import Index from "./pages";
import Settings from "./pages/settings";
import { ThemeProvider } from "next-themes";
import About from "./pages/about";
import Wallet from "./pages/wallet";
import Send from "./pages/wallet/send";
import Receive from "./pages/wallet/receive";
import { useSubstrateState } from "./context/SubstrateContext";
import { Spin } from "antd";

export default function App() {
  const { apiState, apiError, keyringState } = useSubstrateState()

  if (apiState !== 'READY') {
    return (
      <div className="connecting-node">
        <center>
          <Spin />
          <h3>Connecting to our node...</h3>
        </center>
      </div>
    )
  }
  if (keyringState !== 'READY') {
    return (
      <div className="connecting-node">
        <center>
          <Spin />
          <h3>Loading accounts...</h3>
        </center>
      </div>
    )
  }

  return (
    <ThemeProvider enableSystem={false}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="connect" element={<Connect />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="wallet/send" element={<Send />} />
          <Route path="wallet/receive" element={<Receive />} />
          <Route path="about" element={<About />} />
          <Route path="home" element={<Home />} />
          <Route path="auction" element={<Auction />} />
          <Route path="bridge" element={<NotFound />} />
          {/* <Route path="exchange" element={<Exchange />} /> */}
          {/* <Route path="borrow" element={<Exchange />} /> */}
          {/* <Route path="stake" element={<Exchange />} /> */}
          <Route path="settings" element={<Settings />} />
          <Route path="/under-development" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
