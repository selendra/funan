import { useTheme } from "next-themes";
import { Row, Col } from "antd";
import { useContext, useEffect } from "react";
import { AccountContext } from "../context/AccountContext";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { theme } = useTheme();
  let navigate = useNavigate();
  const {
    account,
    substrateAccount,
  } = useContext(AccountContext);

  if(substrateAccount.length !== 0 || !account) navigate('/home');

  return (
    <div className="vertical-layout">
      <div className="home-navbar">
        <div className="home-container">
          <img
            src="/images/logo-white.png"
            alt="selendra-logo-white"
            height={60}
            style={{ marginTop: "15px" }}
          />

          <div className="index-data">
            <div className="welcome-message">Welcome to Selendra Wallet</div>
            <h4 className="welcome-sub-message">
              Send, receive and stake your SEL
            </h4>
          </div>

          <div className="pos-relative">
            <div className="index-btn-section">
              <Row justify="space-between" gutter={[0, 40]}>
                <Col xs={24} sm={11} md={7} className="index-btn con-wallet">
                  <img src="/icons/bulk/wallet-3.svg" alt="" height="40px" />
                  Connect Wallet
                </Col>
                <Col xs={24} sm={11} md={7} className="index-btn create-wallet">
                  <img
                    src="/icons/bulk/wallet-add-1-index.svg"
                    alt=""
                    height="40px"
                  />
                  Create Wallet
                </Col>
                <Col
                  xs={24}
                  sm={11}
                  md={7}
                  className="index-btn restore-wallet"
                >
                  <img src="/icons/bulk/key-square.svg" alt="" height="40px" />
                  Restore Wallet
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <div className="home-container">
        <div className="apps-section">
          <h3>
            The SELENDRA Bitriel Wallet has been created as a Progressive Web
            App (PWA) which is easy to launch on all platforms:{" "}
          </h3>
          <Row
            gutter={[0, 20]}
            justify="space-between"
            className="apps-btn-section"
          >
            <Col xs={24} sm={11} className="apps-btn">
              <img
                src={`/icons/bulk/${
                  theme === "light" ? "android.svg" : "android-dark.svg"
                }`}
                alt=""
                height="30px"
              />
              Andriod
            </Col>
            <Col xs={24} sm={11} className="apps-btn">
              <img
                src={`/icons/bulk/${
                  theme === "light" ? "apple.svg" : "apple-dark.svg"
                }`}
                alt=""
                height="30px"
              />
              iOS
            </Col>
          </Row>
        </div>
      </div>
      <div className="home-container">
        <Row className="index-footer">
          <Col>
            <i class="ri-facebook-fill"></i>
            <i class="ri-telegram-fill"></i>
            <i class="ri-twitter-fill"></i>
            <i class="ri-linkedin-fill"></i>
            <i class="ri-medium-fill"></i>
          </Col>
          <Col>
            <p>2022 © Selendra, Blockchain</p>
          </Col>
        </Row>
      </div>
    </div>
  );
}
