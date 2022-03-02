import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import LayoutComponent from './components/Layout';
import Buy from './pages/buy';
import Connect from './pages/connect';
import Exchange from './pages/exchange';
import Profile from './pages/profile';

export default function App() {
  return (
    <BrowserRouter>
      <LayoutComponent>
        <Routes>
          <Route path='connect' element={<Connect />} />
          <Route path='profile' element={<Profile />} />
          <Route path='buy' element={<Buy />} />
          <Route path='exchange' element={<Exchange />} />
          <Route path='borrow' element={<Exchange />} />
          <Route path='stake' element={<Exchange />} />
        </Routes>
      </LayoutComponent>
    </BrowserRouter>
  )
}
