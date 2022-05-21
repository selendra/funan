import React from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
function MenuList() {
  const location = useLocation();
  // ==== >>> Selendra Routes <<< ====
  const routes = [
    {
      icon: "wallet-2.svg",
      name: "Wallet",
      route: "/home",
      disable: false,
    },
    {
      icon: "arrange-square.svg",
      name: "Transfer",
      route: "/wallet/send",
      disable: false,
    },
    {
      icon: "scan-barcode.svg",
      name: "Launchpad",
      route: "/launchpad",
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
      name: "Swap",
      route: "/swap",
      disable: true,
    },
    {
      icon: "money-recive.svg",
      name: "DeFi",
      route: "/defi",
      disable: true,
    },
    {
      icon: "trend-up.svg",
      name: "Earn",
      route: "/earn",
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
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default MenuList;
