import { Button, Card, Col, message, Row, Spin, Tooltip } from "antd";
import { FormatBalance, shortenAddress } from "../utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useFetchBalanceSEL } from "../hooks/useFetchBalanceSEL";
import { useState } from "react";
import ModalAccount from "./ModalAccount";
import metamask from '../assets/metamask.png';
import trustwallet from '../assets/trustwallet.png';
import sel from '../assets/sel-icon.svg';
import { useSubstrateState } from "../context/SubstrateContext";

export default function Wallet({ account, type }) {
  const { api } = useSubstrateState();
  const [state] = useFetchBalanceSEL(account, type, api);
  const[visible, setVisible] = useState(false);

  return (
    <div>
      <ModalAccount 
        visible={visible}
        setVisible={setVisible}
        account={account}
        type={type}
      />
      <Card style={{ borderRadius: "8px", margin: "8px 0" }}>
        <Row gutter={[16, 16]} justify="space-between">
          <Col xs={24} sm={8}>
            <Row gutter={[16, 16]}>
              <Col>
                <div className="wallet-avatar">
                  <img
                    alt=''
                    src={ 
                      type === 'Metamask' ?
                      metamask
                      :
                      type === 'Selendra' ?
                      sel
                      :
                      trustwallet
                    }
                    width={50}
                    height={50}
                  />
                </div>
              </Col>
              <Col>
                <p style={{ paddingBottom: "8px" }}>{shortenAddress(account)}</p>
                <p>{type}</p>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={16}>
            <Row gutter={[16, 16]} justify="space-between">
              <Col span={5}>
                <Spin spinning={state.loading} />
                {!state.loading && (
                  <div>
                    <p>{FormatBalance(state.freeBalance)} CDM</p>
                    <p>Available</p>
                  </div>
                )}
              </Col>
              <Col span={5}>
                <Spin spinning={state.loading} />
                {!state.loading && (
                  <div>
                    <p>{FormatBalance(state.freeBalance)} CDM</p>
                    <p>Total</p>
                  </div>
                )}
              </Col>
              <Col span={5}>
                <Row>
                  <CopyToClipboard text={account}>
                    <Tooltip title='Copy Address' color='#0899dc'>
                      <Button
                        shape="circle"
                        type="text"
                        onClick={() => message.success("Copied")}
                      >
                        <img
                          src="/icons/bulk/copy.svg"
                          alt="money-recive.svg"
                          height="24px"
                        />
                      </Button>
                    </Tooltip>
                  </CopyToClipboard>
                </Row>
                <Row style={{marginTop: '8px'}}>
                  <Button
                    shape="circle"
                    type="text"
                    onClick={() => setVisible(true)}
                  >
                    <img
                      src="/icons/bulk/edit-2.svg"
                      alt="money-recive.svg"
                      height="24px"
                    />
                  </Button>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
