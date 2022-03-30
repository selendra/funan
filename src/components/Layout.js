import React from "react";
import { Layout } from "antd";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutComponent({ children }) {
  return (
    <Layout hasSider>
      <Navbar />
      <Layout className="site-layout" style={{ marginLeft: 250 }}>
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
