import { useContext } from 'react';
import { Avatar, Card, Col, Row } from 'antd';
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
                <Avatar 
                  src={`https://avatars.dicebear.com/api/identicon/${account}.svg`} 
                  size={64}
                />
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
      </Card>
    </div>
  )
}
