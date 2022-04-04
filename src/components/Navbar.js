import React, { useContext, useState } from "react";
import { Row, Menu, Layout, Col, Modal, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo-white.png";
import { AccountContext } from "../context/AccountContext";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme } = useTheme();
  const [userBrowser, setUserBrowser] = useState("");
  const location = useLocation();

  const { hasSelWallet, hasEVMWallet } = useContext(AccountContext);

  // ==== >>> Selendra Routes <<< ====
  const routes = [
    {
      icon: "home-2.svg",
      name: "Home",
      route: "/home",
      disable: false,
    },
    {
      icon: "wallet-2.svg",
      name: "Wallet",
      route: "/wallet",
      disable: false,
    },
    {
      icon: "reserve.svg",
      name: "Auction",
      route: "/auction",
      disable: false,
    },
    {
      icon: "convert-3d-cube.svg",
      name: "Bridge",
      route: "/bridge",
      disable: false,
    },
    {
      icon: "convertshape-2.svg",
      name: "Exchange",
      route: "/exchange",
      disable: true,
    },
    {
      icon: "money-recive.svg",
      name: "Borrow",
      route: "/borrow",
      disable: true,
    },
    {
      icon: "trend-up.svg",
      name: "Stake/Earn",
      route: "/stake",
      disable: true,
    },
  ];

  const buttomMenus = [
    {
      icon: "document-1.svg",
      name: "Docs",
      route: "https://docs.selendra.org/",
      disable: false,
      external: true,
    },
    {
      icon: "profile-circle.svg",
      name: "About",
      route: "https://www.selendra.org/about",
      disable: false,
      external: true,
    },
    {
      icon: "setting-2.svg",
      name: "Settings",
      route: "/settings",
      disable: false,
      external: false,
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
          <img
            src={theme === "light" ? logo : logoWhite}
            alt="selendra-logo"
            className="layout__logo"
          />
        </Col>
      </Row>
      <Menu
        className="layout__menu top-left-navbar"
        theme="light"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        // selectedKeys={[location.pathname]}
      >
        {/* ===>>> Map Sel Routes <<<==== */}

        {routes.map((route, index) => {
          const { icon, name, route: link, disable } = route;

          if (!disable) {
            return (
              <Menu.Item key={link}>
                <NavLink activeClassName="active" to={link}>
                  <img src={`/icons/bulk/${icon}`} alt={name} />
                  <span>{name}</span>
                </NavLink>
              </Menu.Item>
            );
          } else {
            return (
              <Menu.Item key={link} className="menu-disable">
                <NavLink activeClassName="active" to={link}>
                  <img src={`/icons/bulk/${icon}`} alt={name} />
                  <span>{name}</span>
                </NavLink>
              </Menu.Item>
            );
          }
        })}
      </Menu>

      <Menu
        className="layout__menu bottom-left-navbar"
        theme="light"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        // selectedKeys={[location.pathname]}
      >
        {buttomMenus.map((buttomMenu) => {
          const { name, icon, route: link, external } = buttomMenu;
          if (external) {
            return (
              <Menu.Item key={link}>
                <a href={link} target="_blank" rel="noreferrer">
                  <img src={`/icons/bulk/${icon}`} alt={name} />
                  <span>{name}</span>
                </a>
              </Menu.Item>
            );
          } else {
            return (
              <Menu.Item key={link}>
                <NavLink activeClassName="active" to={link}>
                  <img src={`/icons/bulk/${icon}`} alt={name} />
                  <span>{name}</span>
                </NavLink>
              </Menu.Item>
            );
          }
        })}

        <div className="downlaod-apps-section">
          <a
            href="https://play.google.com/store/apps/details?id=com.selendra.secure_wallet"
            target="_blank"
            rel="noreferrer"
          >
            <Button className="download-apps">Download Apps</Button>
          </a>
        </div>
      </Menu>
    </Layout.Sider>
  );
}
