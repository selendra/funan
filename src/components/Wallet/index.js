import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Card } from "globalComponents";
import { Button, Col, message, Row, Spin, Tooltip } from "antd";
import { useFetchBalanceSEL } from "hooks/useFetchBalanceSEL";
import { useSubstrateState } from "context/SubstrateContext";
import { FormatBalance, shortenAddress } from "utils";
import ModalAccount from "./ModalAccount";
import sel from 'assets/sel-icon.svg';
import metamask from 'assets/metamask.png';
import trustwallet from 'assets/trustwallet.png';
import copy from 'assets/icons/copy.svg';
import edit from 'assets/icons/edit.svg';
import { getUsername } from "../../utils";

export default function Wallet({ account, type }) {
  const { api } = useSubstrateState();
  const [state] = useFetchBalanceSEL(account, type, api);
  const [visible, setVisible] = useState(false);

  return (
    <div style={{marginBottom: '8px'}}>
      <Card>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col xs={24} sm={8} md={8} lg={8} xl={6}>
            <Row gutter={[8, 8]} align='middle'>
              <Col>
                <img
                  alt=''
                  src={ 
                    type === 'Metamask' ? metamask
                    :
                    type === 'Selendra' ? sel
                    :
                    trustwallet
                  }
                  width={50}
                  height={50}
                />
              </Col>
              <Col>
                <h3 className="wallet-username">{getUsername(account).toUpperCase()}</h3>
                <p>{shortenAddress(account)}</p>
                <p>{type}</p>
              </Col>
            </Row>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
            <Spin spinning={state.loading} />
            { !state.loading && (
              <div>
                <p>{FormatBalance(state.freeBalance)} CDM</p>
                <p>Available</p>
              </div>
            )}
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
            <Spin spinning={state.loading} />
            { !state.loading && (
              <div>
                <p>{FormatBalance(state.freeBalance)} CDM</p>
                <p>Total</p>
              </div>
            )}
          </Col>
          <Col xs={4} sm={4} md={2} lg={2} xl={2}>
            <Row justify="center">
              <CopyToClipboard text={account}>
                <Tooltip title='Copy Address' color='#0899dc'>
                  <Button
                    shape="circle"
                    type="text"
                    onClick={() => message.success("Copied")}
                  >
                    <img
                      src={copy}
                      alt=""
                      height="24px"
                    />
                  </Button>
                </Tooltip>
              </CopyToClipboard>
            </Row>
            <Row justify="center" style={{marginTop: '8px'}}>
              <Button
                shape="circle"
                type="text"
                onClick={() => setVisible(true)}
              >
                <img
                  src={edit}
                  alt=""
                  height="24px"
                />
              </Button>
            </Row>
          </Col>
        </Row>
      </Card>

      <ModalAccount 
        visible={visible}
        setVisible={setVisible}
        account={account}
        type={type}
      />
    </div>
  );
}
