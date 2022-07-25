import { useState } from 'react';
import { Row, Col } from 'antd';
import { Modal, Button } from 'globalComponents';
import { useSubstrateState } from 'context/SubstrateContext';
import { useSubmitExtrinsic } from 'hooks/useSubmitExtrinsic';
import { FormatFee } from 'utils';
import ModalConfirmTrx from '../../Modal/ModalConfirmTrx';
import arrowRight from 'assets/icons/arrow-right.svg';
import { useBalance } from '../../../context/BalanceContext';

const options = [
  {
    title: 'Back to Staking',
    subtitle: 'Payouts are automatically bonded to your existing bonded balance.',
    value: 'Staked',
  }, {
    title: 'To Stash',
    subtitle: 'Payouts will be sent to your stash account as free balance.',
    value: 'Stash',
  }, {
    title: 'To Controller',
    subtitle: 'Payouts will be sent to your controller account as free balance.',
    value: 'Controller',
  },
];
const payeeSelected = {
  border: '2px solid #03A9F4'
}

export default function UpdatePayee({
  visible,
  setModal,
  payee,
}) {
  const { api, apiState } = useSubstrateState();
  const { bondedAccounts } = useBalance();
  const [selected, setSelected] = useState({});
  const [password, setPassword] = useState(false);
  const [modal2, setModal2] = useState(false);
  const filteredOptions = options.filter(i => i.title !== payee);

  function handleUpdatePayee() {
    let trx = null;
    if (apiState !== 'READY' || !api || !selected) return trx;

    trx = api.tx.staking.setPayee(selected.value);
    return trx;
  }

  const {submitTx, submitting, estimatedFee} = useSubmitExtrinsic({
    tx: handleUpdatePayee(),
    from: bondedAccounts,
    password: password,
    shouldSubmit: true,
    callbackSubmit: () => {
      setModal2(false)
    },
    callbackInBlock: () => {}
  });

  return (
    <div>
      <Modal
        visible={visible}
        closable={false}
        onCancel={() => setModal(false)}
      >
        <h2>Update Reward Destination</h2>
        <hr style={{marginBottom: '8px'}} />
        <Row justify='space-between'>
          <Col span={10}>
            <div className='staking-payee'>
              <p>{payee}</p>
            </div>
          </Col>
          <Col span={4}>
            <Row style={{height: '100%'}} justify='center' align='middle'>
              <img alt='' src={arrowRight} width={32} height={32} />
            </Row>
          </Col>
          <Col span={10}>
            <div className='staking-payee'>
              <p>{selected.title}</p>
            </div>
          </Col>
        </Row>
        <br/>
        <h3>Select New Reward Destination:</h3>
        { filteredOptions.map((i, key) => 
          <div 
            key={key} 
            className='staking-payeeItem' 
            style={i.title === selected.title ? payeeSelected : {}} 
            onClick={() => setSelected(i)}
          >
            <p>{i.title}</p> 
          </div>
        )}
        <br/>

        <Row justify='end'>
          <p>Estimated Fee: {FormatFee(estimatedFee)} CDM</p>
        </Row>
        <Button.Primary 
          block
          loading={submitting} 
          onClick={() => setModal2(true)} 
        >Submit</Button.Primary>
      </Modal>

      <ModalConfirmTrx 
        visible={modal2}
        setVisible={setModal2}
        password={password}
        setPassword={setPassword}
        handleTrx={() => submitTx()}
      />
    </div>
  )
}
