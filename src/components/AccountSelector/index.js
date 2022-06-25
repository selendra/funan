import Icon from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Card } from 'globalComponents';
import { useState, useEffect, useContext } from 'react';
import { Badge, Button, Col, Row } from 'antd';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getUsername, shortenAddress } from "../../utils";
import { useSubstrate } from '../../context/SubstrateContext';
import { AccountContext } from '../../context/AccountContext';
import ButtonConnect from './ButtonConnect';
import CreateWallet from '../CreateWallet';
import RestoreWallet from "../RestoreWallet";
import ModalSelectAccount from './ModalSelectAccount';
import selendra from 'assets/sel-icon.svg';
import evm from 'assets/icons/wallet-evm.svg';
import create from 'assets/icons/create-wallet.svg';
import restore from 'assets/icons/restore.svg';

import { ReactComponent as Edit } from "assets/icons/edit.svg";
import { ReactComponent as Copy } from "assets/icons/copy.svg";
const EditIcon = (props) => <Icon component={Edit} {...props} />;
const CopyIcon = (props) => <Icon component={Copy} {...props} />;

const address = (addr) => addr ? addr.address : '';

export default function AccountSelector({ keyringOptions }) {
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [createWalletVisible, setCreateWalletVisible] = useState(false);
  const { account } = useContext(AccountContext);
  const {
    setCurrentAccount,
    state: { keyring, currentAccount },
  } = useSubstrate();
  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : '';
  
  // when all account got removed
  useEffect(() => {
    currentAccount &&
    keyringOptions.length === 0 && setCurrentAccount('');
  },[currentAccount, keyringOptions, setCurrentAccount]);

  // Set the initial address
  useEffect(() => {
    // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
    !currentAccount &&
      initialAddress.length > 0 &&
      setCurrentAccount(keyring.getPair(initialAddress));
  }, [currentAccount, setCurrentAccount, keyring, initialAddress]);

  return (
    <div>
      <Card>
        <Row justify="space-around" align='middle'>
          <Col xs={24} sm={10} md={8} lg={8} xl={8}>
            <Row gutter={[32, 32]} justify="start">
              <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                { account ? 
                  <ButtonConnect
                    className="home-connect-evm"
                    icon={evm}
                    title="Connected"
                  />
                  :
                  <Link to='/connect'>
                    <ButtonConnect
                      className="home-connect-evm"
                      icon={evm}
                      title="Connect EVM"
                    />
                  </Link>
                }
              </Col>
              <Col xs={8} sm={8} md={8} lg={8} xl={8} onClick={() => setCreateWalletVisible(true)}>
                <ButtonConnect
                  className="home-create-wallet"
                  icon={create}
                  title="Create Wallet"
                />
              </Col>
              <Col xs={8} sm={8} md={8} lg={8} xl={8} onClick={() => setVisible(true)}>
                <ButtonConnect
                  className="home-restore-wallet"
                  icon={restore}
                  title="Restore Wallet"
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={8} md={6} lg={6} xl={8}>
            <Row gutter={[32, 8]} align="middle" justify="start">
              <Col>
                <Row justify='center'>
                  <Badge dot={currentAccount} color="green">
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
                    <h3>{getUsername(address(currentAccount))}</h3>
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
                          onClick={() => toast.success("Copied")}
                        >
                          Copy
                        </Button>
                      </CopyToClipboard>
                    </Row>
                  </div>
                  :
                  <p style={{fontWeight: '500'}}>You don't have Selendra wallet yet.</p>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <ModalSelectAccount
        accounts={keyringOptions}
        keyring={keyring}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        visible={modal}
        setVisible={setModal}
      />
      <RestoreWallet 
        visible={visible} 
        setVisible={setVisible} 
      />
      <CreateWallet
        visible={createWalletVisible}
        setVisible={setCreateWalletVisible}
      />
    </div>
  )
}
