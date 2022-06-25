import { useState } from 'react';
import { Form } from 'antd';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Button, Input } from 'globalComponents';
import { useSubstrateState } from '../../context/SubstrateContext';
import { useFetchBalanceSEL } from '../../hooks/useFetchBalanceSEL';
import { useSubmitExtrinsic } from '../../hooks/useSubmitExtrinsic';
import { FormatBalance, isvalidSubstrateAddress } from '../../utils';
import WalletMenu from '../../components/WalletMenu';
import ModalConfirmTrx from '../../components/Modal/ModalConfirmTrx';

const address = (addr) => addr ? addr.address : '';

export default function Send() {
  const { currentAccount, api } = useSubstrateState();
  const [state] = useFetchBalanceSEL(address(currentAccount), "Selendra", api);
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('');
  const [password, setPassword] = useState('');
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
      return toast.error('Please fill the form!');
    if(!isvalidSubstrateAddress(destination))
      return toast.error('Look like wallet address is not correct!');
    if(balanceNotEnough(amount))
      return toast.error('Not enough balance!');
    setModal(true);
  }

  function handleTransfer() {
    let trx = null;
    if(!api || !destination || !amount) return trx;
    // eslint-disable-next-line no-undef
    const parsedAmount = BigInt(amount * Math.pow(10, 18));
    // console.log(parsedAmount, destination)

    trx = api.tx.balances
      .transfer(destination, parsedAmount);
    return trx;
  }

  const {submitTx, estimatedFee, submitting} = useSubmitExtrinsic({
    tx: handleTransfer(),
    password: password,
    shouldSubmit: true,
    callbackSubmit: () => {
      setModal(false);
    },
    callbackInBlock: () => {}
  })

  return (
    <WalletMenu>
      <Form layout="vertical">
        <Form.Item label="Destination">
          <Input.Text 
            medium
            placeholder='Enter Destination' 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Amount">
          <Input.Text 
            medium
            placeholder='Enter Amount' 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Item>
        <Form.Item style={{margin: '0'}}>
          { currentAccount ?
            <Button.Primary 
              block
              medium
              loading={submitting} 
              onClick={handleConfirm}
            >
              Transfer
            </Button.Primary>
            :
            <Button.Secondary medium block>
              <Link to='/home'>
                Look like you don't have Selendra wallet yet.
              </Link>
            </Button.Secondary>
          }
        </Form.Item>
      </Form>
      
      <ModalConfirmTrx 
        visible={modal}
        setVisible={setModal}
        password={password}
        setPassword={setPassword}
        handleTrx={() => submitTx()}
      />
    </WalletMenu>
  )
}
