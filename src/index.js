import React from 'react';
import { render } from 'react-dom';
import { AccountProvider } from './context/AccountContext';
import App from './App';

import 'antd/dist/antd.min.css';
import './styles/index.css';

render(
  <AccountProvider>
    <App />
  </AccountProvider>,
  document.getElementById('root')
);
