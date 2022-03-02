import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './styles/global.css';
import 'antd/dist/antd.css';
import { AccountProvider } from './context/AccountContext';

ReactDOM.render(
  <AccountProvider>
    <App />
  </AccountProvider>,
  document.getElementById('root')
)
