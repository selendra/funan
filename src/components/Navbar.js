import React, { useContext, useState } from "react";
import { Row, Layout, Col, Modal } from "antd";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo-white.png";
import { AccountContext } from "../context/AccountContext";
import { useTheme } from "next-themes";
import MenuList from "./MenuList";
import { BrowserView } from 'react-device-detect';

export default function Navbar() {
  const { theme } = useTheme();
  const [userBrowser, setUserBrowser] = useState("");

  const { hasSelWallet, hasEVMWallet } = useContext(AccountContext);

  React.useEffect(() => {
    let userAgent = navigator.userAgent;
    if (userAgent.match(/chrome|chromium|crios/i)) {
      setUserBrowser("chrome");
    } else if (userAgent.match(/firefox|fxios/i)) {
      setUserBrowser("firefox");
    } else {
      setUserBrowser("No browser detection");
    }
  }, []);

  return (
    <Layout.Sider
      collapsible
      collapsed={false}
      onCollapse={() => {
        console.log(1);
      }}
      trigger={null}
      theme="light"
      breakpoint="lg"
      collapsedWidth="60"
      width={250}
      style={{
        overflow: "auto",
        height: "100%",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      {/* === >>> If EVM Extension not found <<< === */}
      <BrowserView>
      <Modal
        title={false}
        visible={hasEVMWallet === false}
        footer={false}
        closable={false}
      >
        <center>
          <p>
            EVM Extension is required!{" "}
            {userBrowser === "chrome" ? (
              <a
                href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd"
                target="_blank"
                rel="noreferrer"
              >
                <b>Download Now</b>
              </a>
            ) : (
              <a
                href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/"
                target="_blank"
                rel="noreferrer"
              >
                <b>Download Now</b>
              </a>
            )}
          </p>
        </center>
      </Modal>

      {/* === >>> If Selendra Extension not found <<< === */}
      <Modal
        title={false}
        visible={hasSelWallet === false}
        footer={false}
        closable={false}
      >
        <center>
          <p>
            Selendra Extension is required!{" "}
            {userBrowser === "chrome" ? (
              <a
                href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd"
                target="_blank"
                rel="noreferrer"
              >
                <b>Download Now</b>
              </a>
            ) : (
              <a
                href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/"
                target="_blank"
                rel="noreferrer"
              >
                <b>Download Now</b>
              </a>
            )}
          </p>
        </center>
      </Modal>
      </BrowserView>

      <Row align="middle" justify="center">
        <Col xs={0} sm={0} md={0} lg={20} xl={20}>
          <img
            src={theme === "light" ? logo : logoWhite}
            alt="selendra-logo"
            className="layout__logo"
          />
        </Col>
      </Row>
      <MenuList />
    </Layout.Sider>
  );
}
