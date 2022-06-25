import React from "react";
import { render } from "react-dom";
import { ConfigProvider } from "antd";
import { Toaster } from "react-hot-toast";
import Provider from "./provider";
import App from "./App";

import "antd/dist/antd.variable.min.css";
import "./styles/global.css";
import "remixicon/fonts/remixicon.css";

ConfigProvider.config({
  theme: {
    primaryColor: "#03A9F4",
  },
});

render(
  <Provider>
    <Toaster 
      position="top-right"
      toastOptions={{
        className: 'toast-styling'
      }}
    />
    <div className="body-backgrond">
      <App />
    </div>
  </Provider>,
  document.getElementById("root")
);
