import React from "react";
import LayoutComponent from "../components/Layout";
import { Form, Input, Button, Checkbox, Row, Col, Select, Switch } from "antd";
import { useTheme } from "next-themes";
import { useAddSELToken } from "../hooks/useAddSELToken";

const { Option } = Select;

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [state, handleAddSELToken] = useAddSELToken();
  console.log(state)

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onChange(checked) {
    setTheme(checked ? "dark" : "light");
  }

  const socialMedia = [
    {
      icon: "ri-telegram-fill",
      link: "",
    },
    {
      icon: "ri-facebook-fill",
      link: "",
    },
    {
      icon: "ri-twitter-fill",
      link: "",
    },
    {
      icon: "ri-linkedin-fill",
      link: "",
    },
    {
      icon: "ri-medium-fill",
      link: "",
    },
    {
      icon: "ri-github-fill",
      link: "",
    },
  ];

  return (
    <>
      <LayoutComponent>
        {/* === >>> Wallet Section <<< === */}
        <h2>Selendra Wallet</h2>
        <div className="sel-card">
          <div className="setting__padding">
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              size="large"
              layout="vertical"
            >
              <Form.Item label="Currency" name="currency">
                <Select defaultValue="usd">
                  <Option value="usd">USD</Option>
                  <Option value="KHR">KHR </Option>
                </Select>
              </Form.Item>

              <Form.Item label="Decimal Points" name="decimal-points">
                <Select defaultValue="1">
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                  <Option value="6">6</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Language" name="language">
                <Select defaultValue="en">
                  <Option value="en">English</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <div className="switch-mode">
                  <Switch
                    defaultChecked={theme === "light" ? false : true}
                    onChange={onChange}
                  />
                  <span>{theme === "dark" ? "Dark" : "Light"} Mode</span>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>

        {/* === >>> MetaMask Section <<< === */}
        <h2>Metamask</h2>
        <div className="sel-card">
          <div className="setting__padding">
            {/* <div>
              <h2>Networks</h2>
              <Row className="metamask-section" gutter={[0, 20]}>
                <Col className="add-mainnet">Add Selendra Mainnet</Col>
                <Col className="add-testnet">Add Selendra Testnet</Col>
              </Row>
            </div>

            <br />
            <br /> */}
            <div>
              <h2>Assets</h2>
              <Row className="metamask-section" gutter={[0, 20]}>
                <Col>
                  <Button className="add-mainnet" onClick={handleAddSELToken}>Add SEL Token</Button>
                </Col>
                {/* <Col className="add-testnet">Add Custom Token</Col> */}
              </Row>
            </div>
          </div>
        </div>

        {/* === >>> Link Section <<< === */}
        <h2>Links</h2>
        <div className="sel-card">
          <div className="setting__padding">
            <a href="#">
              <p>How to use Selendra fWallet </p>
            </a>
            <br />
            <a href="#">
              <p>Selendra Explorer </p>
            </a>

            <div className="setting-social-media">
              {socialMedia.map((res) => {
                return <i class={res.icon}></i>;
              })}
            </div>
          </div>
        </div>
      </LayoutComponent>
    </>
  );
}
