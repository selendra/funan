import { useState } from 'react'
import { Modal, Button } from 'globalComponents';
import { useValidator } from 'context/ValidatorContext';
import { Col, Row } from 'antd';
import ModalConfirmTrx from '../../Modal/ModalConfirmTrx';
import { useSubstrateState } from 'context/SubstrateContext';
import { useSubmitExtrinsic } from 'hooks/useSubmitExtrinsic';

const selectedStyle = {
  borderColor: '#03a9f4'
}

export default function Nominate({
  visible,
  setVisible,
  nominate,
  setNominate
}) {
  const { api } = useSubstrateState();
  const { validators } = useValidator();
  const [password, setPassword] = useState('');
  const [modalPassword, setModalPassword] = useState(false);

  function handleSelectValidator(address) {
    if(!nominate.includes(address)) {
      setNominate(
        nominate => !nominate.includes(address) && (nominate.length) < (validators?.length)
        ? nominate.concat(address)
        : nominate
      )
    } 
    if(nominate.includes(address)) {
      setNominate(
        nominate => nominate.includes(address)
        ? nominate.filter((a) => a !== address)
        : nominate
      )
    }
  }

  function handleSetNominate() {
    const _nominate = nominate.map((i) => {
      return {
        Id: i,
      };
    });
    return api.tx.staking.nominate(_nominate);
  }

  const { submitTx, submitting, estimatedFee } = useSubmitExtrinsic({
    tx: handleSetNominate(),
    password: password,
    shouldSubmit: true,
    callbackSubmit: () => {
      setModalPassword(false)
    },
    callbackInBlock: () => {},
  })

  return (
    <div>
      <Modal visible={visible} closable={false} onCancel={() => setVisible(false)}>
        <h2>Select Nominate</h2>
        <br/>
        { validators.map((i, key) => 
          <Row 
            className='staking-nominate' 
            style={nominate.includes(i.address) ? selectedStyle : {}}
            key={key} 
            gutter={[8, 8]} 
            align='middle'
            justify='space-between'
            onClick={() => handleSelectValidator(i.address)}
          >
            <Col>
              <img
                alt=''
                src={`https://avatars.dicebear.com/api/pixel-art-neutral/${i.address}.svg`}
                width={32}
                style={{borderRadius: '16px'}}
              />
              <p>{i.address}</p>
            </Col>
            <Col>
              <p>commission: {i.prefs.commission}%</p>
            </Col>
          </Row>        
        )}
        <br/>
        <Button.Primary block medium onClick={() => setModalPassword(true)}>Submit</Button.Primary>
      </Modal>
      <ModalConfirmTrx 
        visible={modalPassword}
        setVisible={setModalPassword}
        password={password}
        setPassword={setPassword}
        handleTrx={() => submitTx()}
      />
    </div>
  )
}
