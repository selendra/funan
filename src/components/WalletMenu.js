import { Col, Row, Spin } from "antd";
import { Card } from "globalComponents";
import { Link, useLocation } from "react-router-dom";
import { useFetchBalanceSEL } from "../hooks/useFetchBalanceSEL";
import { useSubstrateState } from "../context/SubstrateContext";
import receive from "assets/icons/receive.svg";
import send from "assets/icons/send.svg";

const address = (addr) => addr ? addr.address : '';

export default function WalletMenu({ children }) {
  const { pathname } = useLocation();
  const { currentAccount, api } = useSubstrateState();
  const [ state ] = useFetchBalanceSEL(address(currentAccount), "Selendra", api);

  return (
    <div>
      <h2 style={{wordBreak: 'break-all'}}>
        Account: {address(currentAccount) ? address(currentAccount) : 'Please Create Selendra Wallet'}
      </h2>
      <br />
      <Card>
        <Row gutter={[8, 8]} align="middle">
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <div className={`wallet-tabs ${pathname === '/wallet/send' && 'wallet-tabs-active'}`}>
              <Link to="/wallet/send">
                <img
                  src={send}
                  alt=""
                  height={50}
                />
                <p>Send</p>
              </Link>
            </div>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
            <div className={`wallet-tabs ${pathname === '/wallet/receive' && 'wallet-tabs-active'}`}>
              <Link to="/wallet/receive">
                <img
                  src={receive}
                  alt=""
                  height={50}
                />
                <p>Recieve</p>
              </Link>
            </div>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Row justify="center">
              { state.loading ?
                <Spin />
                :
                <div>
                  <h1>
                    {state.freeBalance} <span>CDM</span>
                  </h1>
                  <p>Available</p>
                </div>
              }
            </Row>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Row justify="center">
              { state.loading ?
                <Spin />
                :
                <div>
                  <h1>
                    {state.freeBalance} <span>CDM</span>
                  </h1>
                  <p>Total</p>
                </div>
              }
            </Row>
          </Col>
        </Row>
      </Card>
      <br />
      <Card>{children}</Card>
    </div>
  );
}
