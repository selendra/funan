import { Col } from 'antd';
import { useState } from 'react';
import { Card, Button } from 'globalComponents';
import { useSubmitExtrinsic } from '../../../hooks/useSubmitExtrinsic';
import { FormatFee } from '../../../utils';
import ModalConfirmTrx from '../../Modal/ModalConfirmTrx';

export default function Summary({
  form,
  nominate,
  api,
  warning,
  error,
  bondError
}) {
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState(false);

  function trx() {
    const _nominate = nominate.map((i) => {
      return {
        Id: i,
      };
    });
    // eslint-disable-next-line no-undef
    const bond = BigInt(form.bond * Math.pow(10, 12));
    const txs = [
      api.tx.staking.bond({Id: form.stash}, bond, form.payee),
      api.tx.staking.nominate(_nominate),
      api.tx.staking.setController({Id: form.controller})
    ];
    return api.tx.utility.batch(txs);
  }

  const { submitTx, submitting, estimatedFee } = useSubmitExtrinsic({
    tx: trx(),
    from: form.stash,
    password: password,
    shouldSubmit: true,
    callbackSubmit: () => {
      setModal(false)
    },
    callbackInBlock: () => {},
  })
  // console.log(estimatedFee)

  return (
    <Card>
      <h2>Summary</h2>
      <table className='staking-table'>
        <tbody>
          <tr>
            <td>Controller:</td>
            <td>{form.controller}</td>
          </tr>
          <tr>
            <td>Reward Destination:</td>
            <td>{form.payee}</td>
          </tr>
          <tr>
            <td>Nominations:</td>
            <td>{nominate.length}</td>
          </tr>
          <tr>
            <td>Bond Amount:</td>
            <td>{form.bond} CDM</td>
          </tr>
          <tr>
            <td>Estimated Tx Fee:</td>
            <td>
              {/* https://github.com/polkadot-js/common/blob/master/packages/util/src/format/formatBalance.ts */}
              {FormatFee(estimatedFee)} CDM
            </td>
          </tr>
        </tbody>
      </table>
      <Col span={24}>
        <Button.Primary 
          block 
          // disabled={error || bondError}
          loading={submitting}
          onClick={() => setModal(true)} 
        >Confirm</Button.Primary>
      </Col>

      <ModalConfirmTrx 
        visible={modal}
        setVisible={setModal}
        password={password}
        setPassword={setPassword}
        handleTrx={() => submitTx()}
      />
    </Card>
  )
}
