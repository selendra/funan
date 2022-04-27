import React from 'react';
import Icon from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { Avatar, Badge, Button, Col, Divider, message, Row } from 'antd';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSubstrate } from '../context/SubstrateContext';
import { shortenAddress } from "../utils";
import ModalSelectAccount from './ModalSelectAccount';
import ButtonConnect from './ButtonConnect';
import { ReactComponent as Edit } from "../../public/icons/bulk/edit-2.svg";
import { ReactComponent as Copy } from "../../public/icons/bulk/copy.svg";

const EditIcon = (props) => <Icon component={Edit} {...props} />;
const CopyIcon = (props) => <Icon component={Copy} {...props} />;

const address = (addr) => addr ? addr.address : '';

export default function AccountSelector({ keyringOptions }) {
  const [modal, setModal] = React.useState(false);
  const {
    setCurrentAccount,
    state: { keyring, currentAccount },
  } = useSubstrate();

  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : '';

  // Set the initial address
  React.useEffect(() => {
    // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
    !currentAccount &&
      initialAddress.length > 0 &&
      setCurrentAccount(keyring.getPair(initialAddress))
  }, [currentAccount, setCurrentAccount, keyring, initialAddress]);

  return (
    <div>
      <ModalSelectAccount
        accounts={keyringOptions}
        keyring={keyring}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        visible={modal}
        setVisible={setModal}
      />
      <Row gutter={[8, 8]} align="middle" justify="space-between">
        <Col span={12}>
          <Row gutter={[32, 32]} justify="start">
            <Col xs={12} sm={4}>
              <Link to='/connect'>
                <ButtonConnect
                  className="home-connect-evm"
                  icon="wallet-1.svg"
                  title="Connect EVM"
                />
              </Link>
            </Col>
            <Col xs={12} sm={6}>
            </Col>
            <Col span={6}>
              <ButtonConnect
                className="home-create-wallet"
                icon="wallet-add-1-yellow.svg"
                title="Create Wallet"
              />
            </Col>
            <Col span={6}>
              <ButtonConnect
                className="home-restore-wallet"
                icon="key-pink.svg"
                title="Restore Wallet"
              />
            </Col>
          </Row>
        </Col>
        <Divider
          type="vertical"
          style={{ height: "7em", borderLeft: "2px solid rgba(0,0,0,.07)" }}
        />

        <Col xs={10} sm={11}>
          <Row gutter={[8, 8]} align="middle" justify="center">
            <Col span={6}>
              <Badge dot={true} color="green">
                <Avatar
                  src={
                    `https://avatars.dicebear.com/api/identicon/${address(currentAccount)}.svg`
                  }
                  size={64}
                  style={{ background: "#FFF" }}
                />
              </Badge>
            </Col>
            <Col sm={14}>
              <div>
                <p>{shortenAddress(address(currentAccount))}</p>
                <Row gutter={[8, 8]}>
                  <Button
                    type="link"
                    icon={<EditIcon />}
                    style={{ paddingLeft: "0" }}
                    onClick={() => setModal(true)}
                  >
                    Switch
                  </Button>
                  <CopyToClipboard text={address(currentAccount)}>
                    <Button
                      type="link"
                      icon={<CopyIcon />}
                      style={{ paddingLeft: "0" }}
                      onClick={() => message.success("Copied")}
                    >
                      Copy
                    </Button>
                  </CopyToClipboard>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
