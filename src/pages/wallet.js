import { Col, Row, Tabs } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Assets from "../components/Assets";
import LayoutComponent from "../components/Layout";
import Transactions from "../components/Transactions";

const { TabPane } = Tabs;

export default function Wallet() {
  return (
    <>
      <LayoutComponent>
        <h2>Wallet 1</h2>

        <div className="wallet-background-card">
          <Row gutter={[12, 12]}>
            <Col span={10}>
              <div className="wallet-tabs-section">
                <Row gutter={[12, 12]}>
                  <Col span={6}>
                    <div className="wallet-tabs active">
                      <Link to="/wallet">
                        <img
                          src={`/icons/bulk/wallet-2.svg`}
                          alt="wallet"
                          height={50}
                        />
                        <p>Wallet</p>
                      </Link>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="wallet-tabs">
                      <Link to="/wallet/send">
                        <img
                          src={`/icons/bulk/send-square.svg`}
                          alt="wallet"
                          height={50}
                        />
                        <p>Send</p>
                      </Link>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="wallet-tabs">
                      <Link to="/wallet/recieve">
                        <img
                          src={`/icons/bulk/receive-square.svg`}
                          alt="wallet"
                          height={50}
                        />
                        <p>Recieve</p>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={7}>
              <div className="wallet-price">
                <h1>
                  14.615 <span>SEL</span>
                </h1>
                <p> $20.782 </p>
                <p>Available</p>
              </div>
            </Col>
            <Col span={7}>
              <div className="wallet-price">
                <h1>
                  14.615 <span>SEL</span>
                </h1>
                <p> $20.782 </p>
                <p>Total</p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="wallet-section">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Transactions (0)" key="1">
              <div className="transactions-background">
                <Transactions />
              </div>
            </TabPane>
            <TabPane tab="Assets (0)" key="2">
              <div className="transactions-background">
                <Assets />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </LayoutComponent>
    </>
  );
}
