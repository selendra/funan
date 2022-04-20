import { useContext } from "react";
import { useTheme } from "next-themes";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../context/AccountContext";

export default function Index() {
  const { theme } = useTheme();
  let navigate = useNavigate();
  const {
    account,
    substrateAccount,
    connectSubstrate,
    connectMetamask
  } = useContext(AccountContext);

  if(substrateAccount.length !== 0 || account) navigate('/home');

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
              <Row gutter={[16, 40]}>
                <Col xs={24} sm={11} md={10} lg={10} xl={7}>
                  <Button className="index-btn con-wallet" onClick={connectMetamask}>
                    <img src="/icons/bulk/wallet-3.svg" alt="" height="40px" />
                    Connect EVM
                  </Button>
                </Col>
                <Col xs={24} sm={11} md={10} lg={10} xl={7}>
                  <Button className="index-btn con-wallet-sel" onClick={connectSubstrate}>
                    <img src="/icons/bulk/wallet-3.svg" alt="" height="40px" />
                    Connect Selendra
                  </Button>
                </Col>
                {/* <Col xs={24} sm={11} md={7} className="index-btn create-wallet">
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
                </Col> */}
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
            <i className="ri-facebook-fill"></i>
            <i className="ri-telegram-fill"></i>
            <i className="ri-twitter-fill"></i>
            <i className="ri-linkedin-fill"></i>
            <i className="ri-medium-fill"></i>
          </Col>
          <Col>
            <p>2022 © Selendra, Blockchain</p>
          </Col>
        </Row>
      </div>
    </div>
  );
}
