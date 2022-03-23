import React, { useContext, useState } from "react";
import { Row, Menu, Input, Layout, Col, message, Modal } from "antd";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import ButtonConnect from "./ButtonConnect";
import { AccountContext } from "../context/AccountContext";

export default function LayoutComponent({ children }) {
  const [userBrowser, setUserBrowser] = useState("");
  const location = useLocation();

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
    <Layout>
      <Layout.Sider
        collapsible
        trigger={null}
        theme="light"
        breakpoint="lg"
        collapsedWidth="60"
        width={250}
      >
        {/* === >>> If EVM Extension not found <<< === */}
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

        <Row align="middle" justify="center">
          <Col xs={0} sm={0} md={0} lg={20} xl={20}>
            <img src={logo} alt="" className="layout__logo" />
          </Col>
        </Row>
        <Menu
          className="layout__menu"
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
        >
          <Menu.Item key="/profile">
            <i className="ri-user-line"></i>
            <span>Profile</span>
            <Link to="/profile" />
          </Menu.Item>
          <Menu.Item key="/buy">
            <i className="ri-refund-2-line"></i> <span>Buy</span>
            <Link to="/buy" />
          </Menu.Item>
          <Menu.Item key="3">
            <i className="ri-arrow-left-right-line"></i> <span>Exchange</span>
            <Link to="/exchange" />
          </Menu.Item>
          <Menu.Item key="4">
            <i className="ri-hand-coin-line"></i> <span>Borrow</span>
            <Link to="/borrow" />
          </Menu.Item>
          <Menu.Item key="5">
            <i className="ri-coins-line"></i> <span>Stake/Earn</span>
            <Link to="/stake" />
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header style={{ background: "#FFF" }}>
          <div className="container">
            <div className="top-menu">
              <Input
                placeholder="Search by address"
                className="layout__search"
                prefix={<i className="ri-search-line"></i>}
              />
              <ButtonConnect />
            </div>
          </div>
        </Layout.Header>
        <Layout.Content
          style={{
            minHeight: "85vh",
          }}
        >
          <div className="container">
            <div className="app-layout">{children}</div>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
