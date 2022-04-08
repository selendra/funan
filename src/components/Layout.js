import React, { useState } from "react";
import { Layout, Drawer, Row, Col } from "antd";
import menu from "../assets/menu.svg";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo-white.png";
import { useTheme } from "next-themes";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MenuList from "./MenuList";
export default function LayoutComponent({ children }) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
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
        <Layout.Header style={{ background: "#FFF" }}>
          <div className="container">
            <div className="top-menu">
              <Drawer
                title={
                  <Row justify="center">
                    <img
                      src={theme === "light" ? logo : logoWhite}
                      alt="selendra-logo"
                      width="40%"
                    />
                  </Row>
                }
                width="300"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
              >
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
                src={menu}
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
