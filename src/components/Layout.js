import React, { useEffect, useState } from "react";
import { Layout, Drawer } from "antd";
import menu from "../assets/menu.svg";
import menuWhite from "../assets/menu-white.svg";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo-white.png";
import { useTheme } from "next-themes";
import Navbar from "./Navbar";
// import Footer from "./Footer";
import MenuList from "./MenuList";

export default function LayoutComponent({ children }) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function switchChain() {
      try {
        if(!window.ethereum) return;
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
        });
      } catch (error) {
        console.log('Error on switching network:', error);
      }
    }
    switchChain();
  },[]);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <Layout hasSider>
      <Navbar />
      <Layout className="site-layout">
        {/* <Layout.Header style={{ background: "#FFF" }}>
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
        </Layout.Header> */}
        <Layout.Header style={theme === "light" ? { background: 'rgba(255, 255, 255, 0.822)' } : { background: '#2d333b' }}>
          <div className="container">
            <div className="top-menu">
              <Drawer
                width="300"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                bodyStyle={theme === "light" ? { background: 'rgba(255, 255, 255, 0.822)' } : { background: '#2d333b' }}
              >
                <div style={{padding: '24px'}}>
                  <img
                    src={theme === "light" ? logo : logoWhite}
                    alt="selendra-logo"
                    width="50%"
                  />
                </div>
                <MenuList />
              </Drawer>

              <a href="/home">
                <img
                  src={theme === "light" ? logo : logoWhite}
                  alt="selendra-logo"
                  width="130px"
                />
              </a>

              <img
                className="mobile-menu-btn"
                onClick={showDrawer}
                src={theme === "light" ? menu : menuWhite}
                alt="menu svg"
                width="25px"
              />
            </div>
          </div>
        </Layout.Header>
        <Layout.Content
          style={{
            minHeight: "80vh",
          }}
        >
          <div className="container">
            <div className="app-layout">{children}</div>
          </div>
        </Layout.Content>
        {/* <Footer /> */}
      </Layout>
    </Layout>
  );
}
