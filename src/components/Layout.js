import { Row, Menu, Input, Layout, Col } from "antd";
import { Link, useLocation } from "react-router-dom";
import Icon from "@ant-design/icons";
import logo from "../assets/logo.png";
import { ReactComponent as User } from "../assets/icons/user.svg";
import { ReactComponent as Card } from "../assets/icons/cards.svg";
import { ReactComponent as Trade } from "../assets/icons/trade.svg";
import { ReactComponent as Borrow } from "../assets/icons/money-recive.svg";
import { ReactComponent as Stake } from "../assets/icons/3dcube.svg";
import ButtonConnect from "./ButtonConnect";

const UserIcon = (props) => <Icon component={User} {...props} />;
const CardIcon = (props) => <Icon component={Card} {...props} />;
const TradeIcon = (props) => <Icon component={Trade} {...props} />;
const BorrowIcon = (props) => <Icon component={Borrow} {...props} />;
const StakeIcon = (props) => <Icon component={Stake} {...props} />;

export default function LayoutComponent({ children }) {
  const location = useLocation();

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
