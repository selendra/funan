import { useState } from 'react';
import { Modal, Button } from 'globalComponents';
import { useSubstrateState } from '../../../context/SubstrateContext';
import ModalConfirmTrx from '../../Modal/ModalConfirmTrx';
import { useSubmitExtrinsic } from '../../../hooks/useSubmitExtrinsic';
import { FormatFee } from '../../../utils';
import { useBalance } from '../../../context/BalanceContext';

export default function StopNominator({
  visible,
  setVisible,
  selected
}) {
  const { api, apiState } = useSubstrateState();
  const { nominations } = useBalance();
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState('');

  function handleStop() {
    let trx = null;
    if(apiState !== 'READY' || !api || !nominations) return trx;

    trx = api.tx.staking.chill();
    // if(selected.length === nominations.targets.length) {
    // } else {
    //   let targetsToSubmit;
    //   for(let item of selected) {
    //     // item !== 
    //     // targetsToSubmit = item
    //   }
    //   targetsToSubmit = selected.map((item) => {
    //     return {
    //       Id: item,
    //     };
    //   });
    //   // console.log(targetsToSubmit);
    //   trx = api.tx.staking.nominate(targetsToSubmit);
    // }
    return trx;
  }

  const {submitTx, submitting, estimatedFee} = useSubmitExtrinsic({
    tx: handleStop(),
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
        <h2>Stop All Nominations</h2>
        <hr style={{margin: '18px 0'}}/>

        <p>
          Once submitted, your nominations will be removed from your dashboard immediately, 
          and will not be nominated from the start of the next era.
        </p><br/>

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
