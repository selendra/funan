import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/app.css";
import LayoutComponent from "./components/Layout";
import Buy from "./pages/buy";
import Connect from "./pages/connect";
import Profile from "./pages/profile";
import Exchange from "./pages/exchange";
import NotFound from "./pages/notfound";

export default function App() {
  return (
    <BrowserRouter>
      <LayoutComponent>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="connect" element={<Connect />} />
          <Route path="profile" element={<Profile />} />
          <Route path="buy" element={<Buy />} />
          <Route path="exchange" element={<Exchange />} />
          <Route path="borrow" element={<Exchange />} />
          <Route path="stake" element={<Exchange />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutComponent>
    </BrowserRouter>
  );
}
