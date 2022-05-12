import { Button, Card, Col, message, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import metamask from "../assets/metamask.png";
import trustwallet from "../assets/trustwallet.png";
import LayoutComponent from "../components/Layout";
import ModalMetamask from "../components/ModalMetamask";
import { AccountContext } from "../context/AccountContext";

export default function Connect() {
  const { connectMetamask, connectTrust, account } = useContext(AccountContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(account) {
      navigate('/home');
      message.info("You've already connected!")
    }
  },[account, navigate]);

  function connect() {
    const { ethereum } = window;
    ethereum ? connectMetamask() : setVisible(true);
  }

  return (
    <LayoutComponent>
      <ModalMetamask
        visible={visible}
        setVisible={setVisible}
      />
      <div className="connect__container">
        <Card style={{ borderRadius: "12px" }}>
          <center>
            <h2 className="connect__title">Connect Wallet</h2>
          </center>
          <Row gutter={[80, 80]} justify="center">
            <Col>
              <center className="connect__wallet" onClick={connect}>
                <img src={metamask} alt="" width={48} />
                <p>Metamask</p>
              </center>
            </Col>
            <Col>
              <center className="connect__wallet" onClick={connectTrust}>
                <img src={trustwallet} alt="" width={48} />
                <p>Trust Wallet</p>
              </center>
            </Col>
          </Row>
        </Card>
      </div>
    </LayoutComponent>
  );
}
