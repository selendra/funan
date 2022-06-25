import { Row } from 'antd';
import { useState } from 'react';
import { Modal, Button, Input } from 'globalComponents';
import { useBalance } from '../../../context/BalanceContext';
import { useSubstrateState } from '../../../context/SubstrateContext';
import { useSubmitExtrinsic } from '../../../hooks/useSubmitExtrinsic';
import { FormatFee } from '../../../utils';
import ModalConfirmTrx from '../../Modal/ModalConfirmTrx';
import { useStaking } from '../../../context/StakingContext';

export default function BondExtra({visible, setVisible}) {
  const { api } = useSubstrateState();
  const { getBondOptions } = useStaking();
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState(false);
  const { freeToBond } = getBondOptions();

  function handleBond() {
    try {
      let trx = null;
      if (!api || !amount) return trx;
      // eslint-disable-next-line no-undef
      const parsedAmount = BigInt(amount * Math.pow(10, 18));
      
      trx = api.tx.staking.bondExtra(parsedAmount);
      return trx;
    } catch (error) {}
  }

  const { submitTx, estimatedFee, submitting } = useSubmitExtrinsic({
    tx: handleBond(),
    password: password,
    shouldSubmit: true,
    callbackSubmit: () => {
      setModal(false)
    },
    callbackInBlock: () => {
      setVisible(false)
    },
  });

  return (
    <div>
      <Modal
        visible={visible}
        closable={false}
        onCancel={() => setVisible(false)}
      >
        <h2>Bond Extra</h2>
        <p>Available: {(freeToBond)} CDM</p><br/>
        <p>Bond CDM</p>
        <Input.Text 
          size='large' 
          placeholder='Enter amount CDM' 
          onChange={e => setAmount(e.target.value)}
        />
        <Row justify='end'>
          <p>Estimated Tx Fee: {FormatFee(estimatedFee)} CDM</p>
        </Row>
        <br />
        <Button.Primary 
          block 
          loading={submitting} 
          onClick={() => setModal(true)} 
        >Submit</Button.Primary>
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
