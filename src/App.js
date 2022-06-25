import { ThemeProvider } from "next-themes";
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { useSubstrateState } from "./context/SubstrateContext";
import Loading from "./components/Loading";
import "./styles/app.css";

export default function App() {
  const { apiState, apiError, keyringState } = useSubstrateState();

  if (apiState !== 'READY') {
    return <Loading />
  }
  if (keyringState !== 'READY') {
    return <Loading />
  }
  if(apiError === 'ERROR') {
    return <Loading error />
  }

  return (
    <ThemeProvider enableSystem={false}>
      <BrowserRouter>
        <AnimatePresence>
          <Routes>
            { routes.map((i) =>
              <Route key={i.path} path={i.path} element={i.element} />
            )}
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </ThemeProvider>
  );
}
