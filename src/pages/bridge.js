import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import {
  approveForHandler,
  selendraToWrap,
  wrapApprove,
  wrapTransfer,
} from "../utils/bridge";
import sel from "../assets/tokens/sel.png";
import bnb from "../assets/tokens/bnb.png";
import { useContext, useState } from "react";
import { AccountContext } from "../context/AccountContext";
import LayoutComponent from "../components/Layout";

export default function Bridge() {
  const { substrateAccount } = useContext(AccountContext);
  const [address, setAddress] = useState("");

  function onChangeHandler(val) {
    setAddress(val);
  }
  async function v2ToNative(val) {
    await approveForHandler(val.amount);
    await selendraToWrap(val.amount);

    await wrapApprove(val.amount);
    await wrapTransfer(address, val.amount);
  }

  return (
    <LayoutComponent>
      <Card style={{ borderRadius: "12px" }}>
        <Form layout="vertical" onFinish={v2ToNative}>
          <div className="from-chain-container">
            <p>Form chain</p>
            <div className="from-chain">
              <img src={bnb} alt="" width={32} height={32} />
              <span>Binance Smart Chain</span>
            </div>
          </div>
          <Row justify="center" style={{ fontSize: "24px" }}>
            <i className="ri-arrow-up-down-line"></i>
          </Row>
          <div className="from-chain-container">
            <p>To chain</p>
            <div className="from-chain">
              <img src={sel} alt="" width={32} height={32} />
              <span>Selendra Chain</span>
            </div>
          </div>
          {substrateAccount.length !== 0 && (
            <Form.Item label="Destination">
              <Row gutter={[8, 8]} align="middle">
                <Col span={24}>
                  <Select
                    className="bridge-select"
                    placeholder="Enter Selendra Address"
                    options={substrateAccount}
                    onChange={onChangeHandler}
                    style={{ width: "100%" }}
                    size='large'
                  />
                </Col>
              </Row>
            </Form.Item>
          )}
          <Form.Item name="amount" label="Amount">
            <Input className="buy__input" placeholder="Enter amount" />
          </Form.Item>
          <Form.Item>
            <Button className="buy__button" htmlType="submit">
              Transfer
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </LayoutComponent>
  );
}
