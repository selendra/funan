import { Avatar, Button, Card, Col, message, Row } from 'antd'
import { shortenAddress } from '../utils'
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Wallet({account, type}) {
  return (
    <Card style={{borderRadius: '8px', margin: '8px 0'}}>
      <Row gutter={[16,16]} justify='space-between'>
        <Col span={8}>
          <Row gutter={[16,16]}>
            <Col>
              <Avatar
                src={`https://avatars.dicebear.com/api/identicon/${account}.svg`}
                size={64}
              />
            </Col>
            <Col>
              <p style={{paddingBottom: '8px'}}>{shortenAddress(account)}</p>
              <p>{type}</p>
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <Row gutter={[16,16]} justify='space-between'>
            <Col span={5}>
              <p>0 SEL</p>
              <p>Available</p>
            </Col>
            <Col span={5}>
              <p>0 SEL</p>
              <p>Total</p>
            </Col>
            <Col span={5}>
              <CopyToClipboard text={account}>
                <Button shape='circle' type='text' onClick={() => message.success('Copied')}>
                  <img
                    src="/icons/bulk/copy.svg"
                    alt="money-recive.svg"
                    height="24px"
                  />
                </Button>
              </CopyToClipboard>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
