import { useState } from 'react';
import { Modal, Button } from 'globalComponents';
import { useSubstrateState } from '../../../context/SubstrateContext';
import ModalConfirmTrx from '../../Modal/ModalConfirmTrx';
import { useSubmitExtrinsic } from '../../../hooks/useSubmitExtrinsic';
import { FormatFee } from '../../../utils';
import { useBalance } from '../../../context/BalanceContext';
import { useValidator } from '../../../context/ValidatorContext';

export default function StopNominator({
  visible,
  setVisible,
  selected
}) {
  const { api, apiState } = useSubstrateState();
  const { nominations, bondedAccounts } = useBalance();
  const { validators } = useValidator();
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState('');

  function handleStop() {
    let trx = null;
    if(apiState !== 'READY' || !api || !nominations) return trx;

    if(selected.length === nominations.targets.length) {
      trx = api.tx.staking.chill();
    } else {
      const _nominations = [...validators].filter((n) => {
        return !selected.map((_s) => _s).includes(n.address);
      });
      const targetsToSubmit = _nominations.map((item) => {
        return {
          Id: item.address,
        };
      });
      // console.log(targetsToSubmit);
      trx = api.tx.staking.nominate(targetsToSubmit);
    }
    return trx;
  }

  const {submitTx, submitting, estimatedFee} = useSubmitExtrinsic({
    tx: handleStop(),
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
        closable={false}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <h3>Stop Nominating</h3><br/>
        {/* <h2>Stop {selected.length === nominations?.targets.length ? 'All' : selected.length} Nominations</h2> */}
        <h2>Stop {selected.length} Nomination</h2>
        <hr style={{margin: '18px 0'}}/>

        <p>
          Once submitted, your nominations will be removed from your dashboard immediately, 
          and will not be nominated from the start of the next era.
        </p>
        <br/>

        <p>Estimated Tx Fee: {FormatFee(estimatedFee)} CDM</p>
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
