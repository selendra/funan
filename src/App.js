import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/app.css";
import Auction from "./pages/auction";
import Connect from "./pages/connect";
import Home from "./pages/home";
import Exchange from "./pages/exchange";
import NotFound from "./pages/notfound";
import Bridge from "./pages/bridge";
import Index from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="connect" element={<Connect />} />
        <Route path="home" element={<Home />} />
        <Route path="auction" element={<Auction />} />
        <Route path="bridge" element={<Bridge />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="borrow" element={<Exchange />} />
        <Route path="stake" element={<Exchange />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
