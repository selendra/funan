import { Col, Row, Spin } from "antd";
import { Link, useLocation } from "react-router-dom";
import { FormatBalance } from "../utils";
import { useFetchBalanceSEL } from "../hooks/useFetchBalanceSEL";
import { useSubstrateState } from "../context/SubstrateContext";

const address = (addr) => addr ? addr.address : '';

export default function WalletMenu({ children }) {
  const { pathname } = useLocation();
  const { currentAccount } = useSubstrateState();
  const [ state ] = useFetchBalanceSEL(address(currentAccount), "Injection", { testnet: true });

  return (
    <div>
      <h2>Account: {address(currentAccount) ? address(currentAccount) : 'Please Select Your Selendra Account'}</h2>
      <div className="wallet-background-card">
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={24} xl={10}>
            <div className="wallet-tabs-section">
              <Row gutter={[12, 12]}>
                {/* <Col span={6}>
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
                </Col> */}
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
            {!state.loading && (
              <div className="wallet-price">
                {state.loading ? 
                  <Spin />
                  :
                  <h1>
                    {FormatBalance(state.freeBalance)} <span>CDM</span>
                  </h1>
                }
                {/* <p> $20.782 </p> */}
                <p>Available</p>
              </div>
            )}
          </Col>
          <Col xs={12} sm={12} xl={7}>
            {!state.loading && (
              <div className="wallet-price">
                <Spin spinning={state.loading} />
                {!state.loading && (
                  <h1>
                    {FormatBalance(state.freeBalance)} <span>CDM</span>
                  </h1>
                )}
                {/* <p> $20.782 </p> */}
                <p>Total</p>
              </div>
            )}
          </Col>
        </Row>
      </div>

      <div className="wallet-background-card">{children}</div>
    </div>
  );
}
