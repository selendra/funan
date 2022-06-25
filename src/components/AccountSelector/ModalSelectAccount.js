import { Col, Row } from 'antd';
import { toast } from 'react-hot-toast';
import { Modal } from 'globalComponents';
import { useSubstrateState } from '../../context/SubstrateContext';
import { getUsername, shortenAddress } from '../../utils';

export default function ModalSelectAccount({
  accounts, 
  visible, 
  setVisible,
  keyring,
  // currentAccount,
  setCurrentAccount
}) {
  const { currentAccount } = useSubstrateState();

  const address = (address) => address ? address.value : '';

  function handleSelect(val) {
    setCurrentAccount(keyring.getPair(address(val)));
    toast.success(`Switched to ${shortenAddress(address(val))}`)
    setVisible(false);
  }

  return (
    <Modal
      visible={visible}
      closable={false}
      onCancel={() => setVisible(false)}
    >
      <center>
        <h2>Choose Wallet</h2>
      </center>
      <div>
        { accounts.length > 0 && accounts.map((i, key) => 
          <div 
            onClick={() => handleSelect(i)} 
            key={key} 
            className={`
              modal-select-account-item
              ${
                currentAccount && currentAccount.address === address(i) 
                && 'modal-select-account-item-active'
              }
            `}
          >
            <Row>
              <Col span={24}>
                <h3>{getUsername(address(i))}</h3>
              </Col>
              <Col>
                <p>{address(i)}</p>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </Modal>
  )
}
