import { Avatar, Button, Card, Col, message, Row, Spin, Tooltip } from "antd";
import { FormatBalance, shortenAddress } from "../utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useFetchBalanceSEL } from "../hooks/useFetchBalanceSEL";
import { useState } from "react";
import ModalAccount from "./ModalAccount";

export default function Wallet({ account, type }) {
  const [state] = useFetchBalanceSEL(account, type, {testnet: true});
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
                <Avatar
                  src={`https://avatars.dicebear.com/api/identicon/${account}.svg`}
                  size={64}
                  style={{ background: "#FFF" }}
                />
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
