import { useContext } from 'react';
import { Avatar, Card, Col, Row, Tabs } from 'antd';
import { AccountContext } from '../context/AccountContext';

export default function Profile() {
  const { account } = useContext(AccountContext);

  return (
    <div>
      <Card style={{borderRadius: '8px'}}>
        <Row gutter={[16, 16]} align='middle' justify='space-between'>
          <Col>
            <Row gutter={[16, 16]}>
              <Col>
                <Avatar src={`https://avatars.dicebear.com/api/identicon/${account}.svg`} size={64}/>
              </Col>
              <Col>
                <h2>ID: No ID</h2>
                <p>{account}</p>
              </Col>
            </Row>
          </Col>
          <Col>
            <h2 style={{fontSize: '28px'}}>$ 0</h2>
          </Col>
        </Row>
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='Portfolio' key='1'>

          </Tabs.TabPane>
          <Tabs.TabPane tab='NFT' key='2'>

          </Tabs.TabPane>
          <Tabs.TabPane tab='History' key='3'>

          </Tabs.TabPane>
          <Tabs.TabPane tab='Idenity' key='4'>

          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  )
}
