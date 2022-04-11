import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { useContext, useState } from 'react';
import LayoutComponent from '../../components/Layout';
import WalletMenu from '../../components/WalletMenu';
import { AccountContext } from '../../context/AccountContext';
import { useFetchBalanceSEL } from '../../hooks/useFetchBalanceSEL';
import { FormatBalance, isvalidSubstrateAddress } from '../../utils';

export default function Send() {
  const { substrateAccountActive } = useContext(AccountContext);
  const [state] = useFetchBalanceSEL(substrateAccountActive, "Injection", {testnet: true});
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  function balanceNotEnough(value) {
    if(Number(FormatBalance(state.freeBalance)) < Number(value)) {
      return true;
    } else {
      return false;
    }
  }

  function handleConfirm() {
    if(!amount || !destination)
      return message.error('Please fill the form!');
    if(!isvalidSubstrateAddress(destination))
      return message.error('Look like wallet address is not correct!');
    if(balanceNotEnough(amount))
      return message.error('Not enough balance!');
    setModal(true);
  }

  async function handleTransfer() {
    try {
      setModal(false);
      setLoading(true);
      const SENDER = substrateAccountActive;
      // finds an injector for an address
      const injector = await web3FromAddress(SENDER);

      const provider = new WsProvider('wss://rpc1-testnet.selendra.org');
      const api = await ApiPromise.create({ provider });

      // eslint-disable-next-line no-undef
      const parsedAmount = BigInt(amount * Math.pow(10, 18));

      await api.tx.balances
        .transfer(destination, parsedAmount.toString())
        .signAndSend(
          SENDER, 
          { signer: injector.signer }, 
          (status) => { 
            // console.log(status.toHuman()) 
            if(status.toHuman().status?.Finalized) {
              message.success('Transaction Completed!');
              setLoading(false);
            }
          }
        );
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <LayoutComponent>
      <WalletMenu>
        <Form
          layout="vertical"
          size="large"
        >
          <Form.Item label="Destination">
            <Input 
              className="buy__input" 
              placeholder='Enter Destination' 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Amount">
            <Input 
              className="buy__input" 
              placeholder='Enter Amount' 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} onClick={handleConfirm} className="buy__button">
              Transfer
            </Button>
          </Form.Item>
        </Form>
        <Modal
          title=""
          footer=""
          closable={false}
          visible={modal}
          className='send-modal'
          bodyStyle={{borderRadius: '8px'}}
        >
          <h2 className='send-modal-title'>Do you want to send transaction?</h2>
          <div style={{padding: '16px 0'}} />
          <Row gutter={[16, 16]} justify='end'>
            <Col span={6}>
              <Button type='ghost' className='send-cancel' onClick={() => setModal(false)}>Cancel</Button>
            </Col>
            <Col span={6}>
              <Button className='send-transfer' onClick={handleTransfer}>Transfer</Button>
            </Col>
          </Row>
        </Modal>
      </WalletMenu>
    </LayoutComponent>
  )
}
