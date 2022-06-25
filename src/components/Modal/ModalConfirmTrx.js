import { Col, Row } from 'antd';
import { Modal, Input, Button } from 'globalComponents';

export default function ModalConfirmTrx({
  visible,
  setVisible,
  password,
  setPassword,
  handleTrx
}) {
  return (
    <Modal
      visible={visible}
      closable={false}
    >
      <h2>Do you want to send transaction?</h2>
      <div style={{padding: '8px 0'}} />
      <label style={{display: 'block'}}>Password:</label>
      <Input.Password 
        placeholder='Enter Password'
        type='password'
        size='large'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div style={{padding: '8px 0'}} />
      <Row gutter={[16, 16]} justify='end'>
        <Col span={8}>
          <Button.Secondary 
            block
            onClick={() => setVisible(false)}
          >Cancel</Button.Secondary>
        </Col>
        <Col span={16}>
          <Button.Primary
            block
            onClick={handleTrx}
          >Transfer</Button.Primary>
        </Col>
      </Row>
    </Modal>
  )
}
