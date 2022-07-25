import { useState } from 'react';
import { Alert, Segmented } from 'antd';
import { Input, Button, Modal } from 'globalComponents';
import { useSubmitExtrinsic } from '../../../hooks/useSubmitExtrinsic';
import { useSubstrateState } from '../../../context/SubstrateContext';
import ModalConfirmTrx from '../../Modal/ModalConfirmTrx';
import { FormatFee } from '../../../utils';
import { useBalance } from '../../../context/BalanceContext';

export default function Unbond({
  visible,
  setVisible
}) {
  const { api, decimals } = useSubstrateState();
  const { ledgers, bondedAccounts } = useBalance();
  const [unbondOpt, setUnbondOpt] = useState('input');
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState(false);

  function handleUnbond() {
    try {
      let trx = null;
      if(!api || !amount) return trx;
      // eslint-disable-next-line no-undef
      let parsedAmount;
      if(unbondOpt === 'all') {
        // eslint-disable-next-line no-undef
        parsedAmount = BigInt(ledgers.active * Math.pow(10, decimals));
      } else {
        // eslint-disable-next-line no-undef
        parsedAmount = BigInt(amount * Math.pow(10, decimals));
      }
      // console.log(unbondOpt);
      trx = api.tx.staking.unbond(parsedAmount);
      return trx;
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(bondedAccounts);
  const { submitTx, estimatedFee, submitting } = useSubmitExtrinsic({
    tx: handleUnbond(),
    from: bondedAccounts,
    password: password,
    shouldSubmit: true,
    callbackSubmit: () => {
      setModal(false)
    },
    callbackInBlock: () => {
      setVisible(false)
    },
  })

  return (
    <div>
      <Modal
        visible={visible}
        closable={false}
        onCancel={() => setVisible(false)}
        className='modal-select-account'
      >
        <Segmented
          block
          defaultValue='input'
          onChange={setUnbondOpt}
          options={[
            {
              label: 'Unbond',
              value: 'input',
            },
            {
              label: 'Unbond All',
              value: 'all',
            },
          ]}
        /><br />
        { unbondOpt === 'input' 
          ?
          <div>
            <h3>Bonded: {ledgers?.active} CDM</h3><br />
            <p>Unbond CDM:</p>
            <Input.Text 
              size='large' 
              placeholder='Enter amount to unbond' 
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <p>Once unbonding, you must wait x days for your funds to become available.</p><br />
            <p>Estimated Tx Fee: {FormatFee(estimatedFee)} CDM</p>
            <Button.Primary 
              block 
              loading={submitting}
              onClick={() => setModal(true)}
            >Submit</Button.Primary>
          </div>
          :
          <div>
            {/* <h3>Unbond All CDM</h3> */}
            <Alert message='Stop nominating before unbonding all funds.' type='warning' showIcon />
            <br />
            <h4>Amount to unbond:</h4>
            <h3>{ledgers?.active} CDM</h3><br />
            <p>Once unbonding, you must wait x days for your funds to become available.</p>
            <br />
            <Button.Primary 
              block
              loading={submitting}
              onClick={() => setModal(true)}
            >Submit</Button.Primary>
          </div>
        }
      </Modal>
      <ModalConfirmTrx 
        visible={modal}
        setVisible={setModal}
        password={password}
        setPassword={setPassword}
        handleTrx={() => submitTx()}
      />
    </div>
  )
}
