import React from "react";
import { render } from "react-dom";
import App from "./App";

import "antd/dist/antd.variable.min.css";
import "./styles/index.css";

import { ConfigProvider } from "antd";

import "remixicon/fonts/remixicon.css";
import { TokenProvider } from "./context/TokenContext";
import { AccountProvider } from "./context/AccountContext";

ConfigProvider.config({
  theme: {
    primaryColor: "#03A9F4",
  },
});

render(
  <AccountProvider>
    <TokenProvider>
      <div className="body-backgrond">
        <App />
      </div>
    </TokenProvider>
  </AccountProvider>,
  document.getElementById("root")
);
