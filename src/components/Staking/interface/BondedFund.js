import { useState } from 'react';
import { Col, Row } from 'antd';
import { Card } from 'globalComponents';
import BondGraph from '../BondGraph';
import Unbond from '../modal/Unbond';
import BondExtra from '../modal/BondExtra';
import UnlockChunk from '../modal/UnlockChunk';
import { useBalance } from '../../../context/BalanceContext';
import { useStaking } from '../../../context/StakingContext';
import minus from 'assets/icons/minus-square.svg';
import plus from 'assets/icons/add-square.svg';
import key from 'assets/icons/key-square.svg';

export default function BondedFund() {
  const { ledgers, bondedAccounts } = useBalance();
  const { getBondOptions } = useStaking();
  const [bondExtraModal, setBondExtraModal] = useState(false);
  const [unbondModal, setUnbondModal] = useState(false);
  const [unlockModal, setUnlockModal] = useState(false);
  const { 
    freeToBond,
    totalUnlocking,
    totalUnlocked, 
  } = getBondOptions();  

  return (
    <div>
      <Card>
        <h3>Bonded Funds</h3>
        <Row>
          <Col>
            <div className='staking-bondUnbond' onClick={() => setBondExtraModal(true)}>
              <img src={plus} alt='' width={40} />
            </div>
          </Col>
          <Col>
            <div className='staking-bondUnbond' onClick={() => setUnbondModal(true)}>
              <img src={minus} alt='' width={40} />
            </div>
          </Col>
          <Col>
            <div className='staking-bondUnbond' onClick={() => setUnlockModal(true)}>
              <img src={key} alt='' width={40} />
            </div>
          </Col>
        </Row>            
        <BondGraph 
          active={ledgers.active}
          unlocking={totalUnlocking}
          unlocked={totalUnlocked}
          free={freeToBond}
          inactive={!bondedAccounts}
        />
      </Card>

      <BondExtra
        visible={bondExtraModal}
        setVisible={setBondExtraModal}
      />
      <Unbond 
        visible={unbondModal}
        setVisible={setUnbondModal}
      />
      <UnlockChunk 
        visible={unlockModal}
        setVisible={setUnlockModal}
      />
    </div>
  )
}
