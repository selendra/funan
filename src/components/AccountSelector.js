import React from 'react';
import Icon from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Badge, Button, Col, message, Row } from 'antd';
import { shortenAddress } from "../utils";
import { useSubstrate } from '../context/SubstrateContext';
import { AccountContext } from '../context/AccountContext';
import ButtonConnect from './ButtonConnect';
import CreateWallet from './CreateWallet';
import RestoreWallet from "./RestoreWallet";
import ModalSelectAccount from './ModalSelectAccount';
import selendra from '../assets/sel-icon.svg';

import { ReactComponent as Edit } from "../../public/icons/bulk/edit-2.svg";
import { ReactComponent as Copy } from "../../public/icons/bulk/copy.svg";
const EditIcon = (props) => <Icon component={Edit} {...props} />;
const CopyIcon = (props) => <Icon component={Copy} {...props} />;

const address = (addr) => addr ? addr.address : '';

export default function AccountSelector({ keyringOptions }) {
  const [modal, setModal] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [createWalletVisible, setCreateWalletVisible] = React.useState(false);
  const { account } = React.useContext(AccountContext);
  const {
    setCurrentAccount,
    state: { keyring, currentAccount },
  } = useSubstrate();

  const initialAddress =
  keyringOptions.length > 0 ? keyringOptions[0].value : '';
  
  // when all account got removed
  React.useEffect(() => {
    currentAccount &&
    keyringOptions.length === 0 && setCurrentAccount('');
  },[currentAccount, keyringOptions, setCurrentAccount]);

  // Set the initial address
  React.useEffect(() => {
    // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
    !currentAccount &&
      initialAddress.length > 0 &&
      setCurrentAccount(keyring.getPair(initialAddress));
  }, [currentAccount, setCurrentAccount, keyring, initialAddress]);

  return (
    <div>
      <RestoreWallet visible={visible} setVisible={setVisible} />
      <CreateWallet
        createWalletVisible={createWalletVisible}
        setCreateWalletVisible={setCreateWalletVisible}
      />
      <ModalSelectAccount
        accounts={keyringOptions}
        keyring={keyring}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        visible={modal}
        setVisible={setModal}
      />

      <Row gutter={[{sm: [40, 40], md: [32,64]}]} justify="space-between">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={6} sm={6} md={8} lg={6} xl={6}>
              { account ? 
                <ButtonConnect
                  className="home-connect-evm"
                  icon="bsc-logo.png"
                  title="Connected"
                />
              :
                <Link to='/connect'>
                  <ButtonConnect
                    className="home-connect-evm"
                    icon="wallet-1.svg"
                    title="Connect EVM"
                  />
                </Link>
              }
            </Col>
            <Col xs={6} sm={2} md={2} lg={2} xl={2}></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6} onClick={() => setCreateWalletVisible(true)}>
              <ButtonConnect
                className="home-create-wallet"
                icon="wallet-add-1-yellow.svg"
                title="Create Wallet"
              />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6} onClick={() => setVisible(true)}>
              <ButtonConnect
                className="home-restore-wallet"
                icon="key-pink.svg"
                title="Restore Wallet"
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={12} md={10} lg={10} xl={10}>
          <Row gutter={[32, 0]} align="middle" justify="start">
            <Col>
              <Row justify='center'>
                <Badge dot={true} color="green">
                  <img
                    alt=''
                    src={selendra}
                    height={50}
                    width={50}
                    className='account-avatar'
                  />
                </Badge>
              </Row>
            </Col>
            <Col>
              { keyringOptions.length > 0 ?
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
                :
                <p>You don't have Selendra wallet yet.</p>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
