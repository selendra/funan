import { Button, Card, Col, message, Row } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import metamask from "../assets/metamask.png";
import trustwallet from "../assets/trustwallet.png";
import LayoutComponent from "../components/Layout";
import { AccountContext } from "../context/AccountContext";

export default function Connect() {
  const { connectMetamask, connectTrust, account } = useContext(AccountContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(account) {
      navigate('/home');
      message.info('You has already connected!')
    }
  },[account, navigate]);

  return (
    <LayoutComponent>
      <div className="connect__container">
        <Card style={{ borderRadius: "12px" }}>
          <center>
            <h2 className="connect__title">Connect Wallet</h2>
          </center>
          <Row gutter={[80, 80]} justify="center">
            <Col>
              <center className="connect__wallet" onClick={connectMetamask}>
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
          <div className="create__wallet">
            <center>
              <p>Don’t have a wellet yet?</p>
              <Button type="primary" className="btn__primary">
                Create Wallet
              </Button>
            </center>
          </div>
        </Card>
      </div>
    </LayoutComponent>
  );
}
