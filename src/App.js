import { ThemeProvider } from 'next-themes'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import { useSubstrateState } from './context/SubstrateContext'
import Loading from './components/Loading'
import './styles/app.css'
import { Footer, Header } from 'antd/lib/layout/layout'

export default function App() {
  const { apiState, apiError, keyringState } = useSubstrateState()

  if (apiState !== 'READY') {
    return <Loading />
  }
  if (keyringState !== 'READY') {
    return <Loading />
  }
  if (apiError === 'ERROR') {
    return <Loading error />
  }

  return (
    <ThemeProvider enableSystem={false}>
      <BrowserRouter>
        <AnimatePresence>
          <Header>Hello</Header>
          <Routes>
            {routes.map((i) => (
              <Route key={i.path} path={i.path} element={i.element} />
            ))}
          </Routes>
          <Footer style={{ background: '#fff' }}>
            <center>
              <p>
                Build with &#10084;&#65039; <b>SELENDRA</b>
              </p>
            </center>
          </Footer>
        </AnimatePresence>
      </BrowserRouter>
    </ThemeProvider>
  )
}
