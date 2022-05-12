import { Col, Row, Spin } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useFetchBalanceSEL } from "../hooks/useFetchBalanceSEL";
import { useSubstrateState } from "../context/SubstrateContext";
import { FormatBalance } from "../utils";

const address = (addr) => addr ? addr.address : '';

export default function WalletMenu({ children }) {
  const { pathname } = useLocation();
  const { currentAccount } = useSubstrateState();
  const [ state ] = useFetchBalanceSEL(address(currentAccount), "Selendra", { testnet: true });

  return (
    <div>
      <h2>Account: {address(currentAccount) ? address(currentAccount) : 'Please Create Selendra Wallet'}</h2>
      <div className="wallet-background-card">
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={24} xl={10}>
            <div className="wallet-tabs-section">
              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <div className={`wallet-tabs ${pathname === '/wallet/send' && 'active'}`}>
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
                <Col span={12}>
                  <div className={`wallet-tabs ${pathname === '/wallet/receive' && 'active'}`}>
                    <Link to="/wallet/receive">
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
          <Col xs={12} sm={12} xl={7}>
            <Row justify="center">
            { state.loading ?
              <Spin />
              :
              <div className="wallet-price">
                <h1>
                  {FormatBalance(state.freeBalance)} <span>CDM</span>
                </h1>
                <p>Available</p>
              </div>
            }
            </Row>
          </Col>
          <Col xs={12} sm={12} xl={7}>
            <Row justify="center">
            { state.loading ? 
              <Spin />
              :
              <div className="wallet-price">
                <h1>
                  {FormatBalance(state.freeBalance)} <span>CDM</span>
                </h1>
                <p>Total</p>
              </div>
            }
            </Row>
          </Col>
        </Row>
      </div>

      <div className="wallet-background-card">{children}</div>
    </div>
  );
}
