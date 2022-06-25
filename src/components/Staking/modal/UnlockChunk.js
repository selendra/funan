import { useState } from 'react';
import { BigNumber } from 'bignumber.js';
import { useBalance } from '../../../context/BalanceContext';
import { useStaking } from '../../../context/StakingContext';
import { useSubstrateState } from '../../../context/SubstrateContext';
import { Modal, Button } from 'globalComponents';
import { useSubmitExtrinsic } from '../../../hooks/useSubmitExtrinsic';
import ModalConfirmTrx from '../../Modal/ModalConfirmTrx';
import { FormatBalance, formatBN, FormatFee } from '../../../utils';

export default function UnlockChunk({
  visible,
  setVisible
}) {
  const { ledgers } = useBalance();
  const { api, apiState } = useSubstrateState();
  const { historyDepth, staking } = useStaking();
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState('');
  const [task, setTask] = useState('');
  const [unlockingState, setUnlockingState] = useState('');

  const unlocking = ledgers?.unlocking;
  const activeEra = staking?.activeEra;

  // calculate total withdraw available
  let withdrawAvailable = new BigNumber(0);
  function toBn(amount) {
    return new BigNumber(amount)
      .dividedBy(Math.pow(10, 18))
  }
  for (const _chunk of unlocking) {
    const { era, value } = _chunk;
    const left = era - activeEra?.index;
    
    if (left <= 0) {
      withdrawAvailable = withdrawAvailable.plus(toBn(value));
    }
  }

  function handleTrx() {
    let trx = null;
    if (!api || apiState !== 'READY') return trx;
    if(task === 'rebond') {
      // eslint-disable-next-line no-undef
      const parseAmount = BigInt(unlockingState * Math.pow(10, 18));
      trx = api.tx.staking.rebond(parseAmount);
    }
    if(task === 'withdraw') {
      // eslint-disable-next-line no-undef
      // const parseAmount = BigInt(totalUnlocking * Math.pow(10, 18));
      trx = api.tx.staking.withdrawUnbonded(historyDepth);
    }
    return trx;
  }

  const {submitting, submitTx, estimatedFee} = useSubmitExtrinsic({
    tx: handleTrx(),
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
      >
        <h2>Unlock</h2><br/>
        { withdrawAvailable.toNumber() > 0 && 
          <div>
            <h3>Available to Withdraw</h3>
            <p>{withdrawAvailable.toNumber()} CDM</p><br/>
            <p>Estimated Fee: {FormatFee(estimatedFee)} CDM</p>
            <Button.Primary
              block
              loading={submitting}
              onClick={() => {
                setTask('withdraw');
                setModal(true);
              }}
            >Withdraw</Button.Primary>
          </div>
        }
        { unlocking.length === 0 && <h3>No Unlocks</h3> }
        { unlocking.length > 0 && unlocking.map((chunk) => {
          const { era, value } = chunk;
          const left = era - activeEra?.index;

          return (
            <div>
              <h3>{left <= 0 ? 'Unlocked' : `Unlocks after era ${era}`}</h3>
              <p>{FormatBalance(value)}</p>
              <hr/><br/>
              <p>Unlocks take {left} eras before they can be withdrawn. You can rebond unlocks at any time in this period, or withdraw them to your free balance thereafter.</p><br/>
              <p>Estimated Fee: {FormatFee(estimatedFee)} CDM</p>
              <Button.Primary 
                block
                loading={submitting}
                onClick={() => {
                  setTask('rebond');
                  setModal(true);
                  setUnlockingState(formatBN(value));
                }}
              >Rebond</Button.Primary>
            </div>
          )
        })}
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
