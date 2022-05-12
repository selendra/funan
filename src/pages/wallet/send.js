import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutComponent from '../../components/Layout';
import WalletMenu from '../../components/WalletMenu';
import { useSubstrateState } from '../../context/SubstrateContext';
import { useFetchBalanceSEL } from '../../hooks/useFetchBalanceSEL';
import { FormatBalance, isvalidSubstrateAddress } from '../../utils';

const address = (addr) => addr ? addr.address : '';

export default function Send() {
  const { currentAccount, api } = useSubstrateState();
  const [state] = useFetchBalanceSEL(address(currentAccount), "Selendra", {testnet: true});
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  function balanceNotEnough(value) {
    if(Number(FormatBalance(state.freeBalance)) < Number(value)) {
      // console.log(Number(FormatBalance(state.freeBalance)), Number(value));
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

      // eslint-disable-next-line no-undef
      const parsedAmount = BigInt(amount * Math.pow(10, 18));

      const trx = await api.tx.balances
        .transfer(destination, parsedAmount.toString());
      // decrypt pair
      currentAccount.decodePkcs8(password);
      const hash = await trx
        .signAndSend(
          currentAccount, 
          (status) => { 
            if(status.toHuman().status?.Finalized) {
              message.success('Transaction Completed!');
              setLoading(false);
            }
          }
        );
      console.log('Transaction sent with hash: ', hash);
    } catch (error) {
      message.error('Something went wrong!');
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
            { currentAccount ?
              <Button loading={loading} onClick={handleConfirm} className="buy__button">
                Transfer
              </Button>
              :
              <Button className="buy__button">
                <Link to='/home'>
                  Look like you don't have Selendra wallet yet.
                </Link>
              </Button>
            }
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
          <label style={{display: 'block', paddingBottom: '8px'}}>Password:</label>
          <Input 
            className="buy__input" 
            placeholder='Enter Password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
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
