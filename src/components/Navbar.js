import React, { useContext, useState } from "react";
import { Row, Menu, Layout, Col, Modal } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { AccountContext } from "../context/AccountContext";

export default function Navbar() {
  const [userBrowser, setUserBrowser] = useState("");
  const location = useLocation();

  const { hasSelWallet, hasEVMWallet } = useContext(AccountContext);

  // ==== >>> Selendra Routes <<< ====
  const routes = [
    {
      icon: "home-2.svg",
      name: "Home",
      route: "/home",
    },
    {
      icon: "profile-circle.svg",
      name: "Profile",
      route: "/profile",
    },
    {
      icon: "reserve.svg",
      name: "Auction",
      route: "/auction",
    },
    {
      icon: "convertshape-2.svg",
      name: "Exchange",
      route: "/exchange",
    },
    {
      icon: "money-recive.svg",
      name: "Borrow",
      route: "/borrow",
    },
    {
      icon: "trend-up.svg",
      name: "Stake/Earn",
      route: "/stake",
    },
    {
      icon: "trend-up.svg",
      name: "Bridge",
      route: "/bridge",
    },
  ];

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
          <img src={logo} alt="selendra-logo" className="layout__logo" />
        </Col>
      </Row>
      <Menu
        className="layout__menu"
        theme="light"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        {/* ===>>> Map Sel Routes <<<==== */}
        {routes.map((route) => {
          const { icon, name, route: link } = route;
          return (
            <Menu.Item key={name}>
              <NavLink activeClassName="active" to={link}>
                <img src={`/icons/bulk/${icon}`} alt={name} />
                <span>{name}</span>
              </NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
    </Layout.Sider>
  );
}
