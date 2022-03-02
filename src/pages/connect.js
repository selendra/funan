import { Card, Col, Row } from 'antd'
import { useContext } from 'react'
import metamask from '../assets/metamask.png'
import trustwallet from '../assets/trustwallet.png'
import { AccountContext } from '../context/AccountContext'

export default function Connect() {
  const { connectMetamask, connectTrust } = useContext(AccountContext);

  return (
    <div className='connect-container'>
      <Card style={{borderRadius: '8px'}}>
        <center>
          <h2 className='connect-title'>Connect Wallet</h2>
        </center>
        <Row gutter={[32, 32]} justify='center'>
          <Col>
            <center className='connect-wallet' onClick={connectMetamask}>
              <img src={metamask} alt='' width={48} />
              <p>Metamask</p>
            </center>
          </Col>
          <Col>
            <center className='connect-wallet' onClick={connectTrust}>
              <img src={trustwallet} alt='' width={48} />
              <p>Trust Wallet</p>
            </center>
          </Col>
        </Row>
      </Card>
    </div>
  )
}