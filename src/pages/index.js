import { Row, Col } from "antd";
import { useTheme } from "next-themes";
import { Button } from "globalComponents";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubstrateState } from "context/SubstrateContext";
import RestoreWallet from "components/RestoreWallet";
import CreateWallet from "components/CreateWallet";
import logoWhite from "assets/logo-white.png";
import createWallet from "assets/icons/create-wallet-white.svg";
import restoreWallet from "assets/icons/restore-white.svg";
import androidWhite from "assets/icons/android-white.svg";
import android from "assets/icons/android.svg";
import appleWhite from "assets/icons/apple-white.svg";
import apple from "assets/icons/apple.svg";


export default function Index() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { currentAccount } = useSubstrateState();
  const [visible, setVisible] = useState(false);
  const [createWalletVisible, setCreateWalletVisible] = useState(false);

  const onVisible = () => {
    setVisible(!visible);
  };
  const handleCreateWalletVisible = () => {
    setCreateWalletVisible(!createWalletVisible);
  };

  // useEffect(() => {
  //   if(currentAccount) navigate('/home');
  // },[currentAccount, navigate]);
   
  return (
    <div className="index-wrapper">
      <div className="index-top-section">
        <div className="index-container">
          <img
            src={logoWhite}
            alt=""
            height={80}
            style={{ marginTop: "15px" }}
          />

          <div className="welcome">
            <div className="welcome-message">Welcome to Selendra Wallet</div>
            <h4 className="welcome-sub-message">
              Send, receive and stake your SEL
            </h4>
          </div>

          <Row gutter={[15, 15]}>
            <Col xs={24} sm={12} md={10} lg={10} xl={9}>
              <Button.Primary
                large
                block
                onClick={handleCreateWalletVisible}
              >
                <img src={createWallet} style={{color: '#FFF'}} alt="" height="40px" />
                Create Wallet
              </Button.Primary>
            </Col>
            <Col xs={24} sm={12} md={10} lg={10} xl={9}>
              <Button.Secondary
                large
                block
                onClick={onVisible}
              >
                <img src={restoreWallet} alt="" height="40px" />
                Restore Wallet
              </Button.Secondary>
            </Col>
          </Row>
        </div>
      </div>

      <div className="index-container">
        <div className="apps-section">
          <h3>
            The SELENDRA Bitriel Wallet has been created as a Progressive Web
            App (PWA) which is easy to launch on all platforms:{" "}
          </h3>
          <br />
          <Row
            gutter={[18, 18]}
            justify="space-between"
          >
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Button.Accent medium block>
                <img
                  src={
                    theme === "light" ? 
                    android : androidWhite
                  }
                  alt=""
                  height="30px"
                />
                Android
              </Button.Accent>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Button.Accent medium block>
                <img
                  src={
                    theme === "light" ? 
                    apple : appleWhite
                  }
                  alt=""
                  height="30px"
                />
                IOS
              </Button.Accent>
            </Col>
          </Row>
        </div>
      </div>

      <div className="index-container">
        <Row className="index-footer" align="middle">
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

      <CreateWallet
        visible={createWalletVisible}
        setVisible={setCreateWalletVisible}
      />
      <RestoreWallet 
        visible={visible} 
        setVisible={setVisible} 
      />
    </div>
  );
}
