import { useState } from 'react'
import { Col, Row } from 'antd'
import { Card } from 'globalComponents'
import { Link } from 'react-router-dom'
import { Button } from 'globalComponents'
import { getRewardDest } from '../../../utils'
import { useStaking } from '../../../context/StakingContext'
import { useBalance } from '../../../context/BalanceContext'
import UpdatePayee from '../modal/UpdatePayee'

export default function Status() {
  const { staking } = useStaking();
  const { bondedAccounts } = useBalance();
  const [modal, setModal] = useState(false);

  return (
    <div style={{display: 'inline-block', height: '100%', width: '100%'}}>
      <Card style={{display: 'inline-block', height: '100%', width: '100%'}}>
        <h3>Status</h3>
        <div style={{padding: '8px 0'}} />
        { !bondedAccounts ?
          <Link to='/staking/setup'>
            <Button.Primary>Start Staking</Button.Primary>
          </Link>
          : 
          <h2>Staking</h2>
        }
        <hr style={{margin: '8px 0'}}/>
        <h3>Reward Destination</h3>
        <div style={{padding: '8px 0'}} />
        <Row justify='space-between' align='middle'>
          <Col span={16}>
            <h2>{!bondedAccounts ? 'Not Staking' : getRewardDest(staking?.payee)}</h2>
          </Col>
          <Col span={8}>
            <Row justify='end'>
              { bondedAccounts &&
                <Button.Link onClick={() => setModal(true)}>Update</Button.Link>
              }
            </Row>
          </Col>
        </Row>
      </Card>
      <UpdatePayee 
        visible={modal} 
        setModal={setModal} 
        payee={getRewardDest(staking?.payee)}
      />
    </div>
  )
}
