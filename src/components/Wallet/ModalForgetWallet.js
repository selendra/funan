import { Row, Col } from 'antd';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Modal, Button } from 'globalComponents';
import { AccountContext } from 'context/AccountContext';
import { useSubstrateState } from 'context/SubstrateContext';

export default function ModalForgetWallet({
  account,
  type,
  visible,
  setVisible
}) {
  const { keyring } = useSubstrateState();
  const { disconnect } = useContext(AccountContext);

  function forgetAccount() {
    try {
      if(type === 'Selendra') {
        try {
          keyring.forgetAccount(account);
          setVisible(false);
          toast.success('Wallet removed');
        } catch (error) {
          console.log(error);          
        }
      } else {
        disconnect();
        setVisible(false);
      }
    } catch(e) {}
  }

  return (
    <Modal
      visible={visible}
      closable={false}
      onCancel={() => setVisible(false)}
    >
      <center>
        <h2>Are you sure you want to remove wallet</h2>
        <p>{account} ?</p>
      </center><br />
      <Row gutter={[8, 16]} justify='end'>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Button.Secondary block onClick={() => setVisible(false)}>Cancel</Button.Secondary>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Button.Primary block onClick={forgetAccount}>Remove</Button.Primary>
        </Col>
      </Row>
    </Modal>
  )
}
