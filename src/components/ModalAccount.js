import React from 'react';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { useSubstrateState } from '../context/SubstrateContext';

export default function ModalAccount({
  visible, 
  setVisible,
  account,
  type
}) {
  const { keyring } = useSubstrateState();
  const [confirmModal, setConfirmModal] = React.useState(false);

  function forgetAccount() {
    try {
      if(type === 'Selendra') {
        keyring.forgetAccount(account);
        setConfirmModal(false);
        setVisible(false);
      } else {
        localStorage.setItem('wallet', '');
        setConfirmModal(false);
        setVisible(false);
      }
    } catch (error) {
      console.log(error);      
    }
  }

  function changePassword(val) {
    try {
      const acc = keyring.getPair(account);
      if (!acc) {
        return;
      }
      try {
        if (!acc.isLocked) {
          acc.lock();
        }

        acc.decodePkcs8(val.oldPass);
      } catch (error) {
        console.error(error);
        message.error('Look like your password is not correct!');
        return;
      }
      try {
        keyring.encryptAccount(acc, val.newPass);
        message.success('successfully changed!');
        setVisible(false);
      } catch (error) {
        console.error(error);
        message.error('Look like your password is not correct!');
        return;
      }
    } catch (error) {
      console.log(error);      
    }
  }

  return (
    <div>
      <Modal
        title={false}
        visible={confirmModal}
        footer={false}
        closable={false}
        onCancel={() => setConfirmModal(false)}
        className='modal-select-account'
      >
        <center>
          <h2>Are you sure you want to remove wallet</h2>
          <p>{account} ?</p>
        </center><br />
        <Row gutter={[16, 16]} justify='end'>
          <Col span={6}>
            <Button type='ghost' className='send-cancel' onClick={() => setConfirmModal(false)}>Cancel</Button>
          </Col>
          <Col span={6}>
            <Button className='send-transfer' onClick={forgetAccount}>Remove</Button>
          </Col>
        </Row>
      </Modal>
      <Modal
        title={false}
        visible={visible}
        footer={false}
        closable={false}
        onCancel={() => setVisible(false)}
        className='modal-select-account'
      >
        <div>
          <center>
            <h2>Wallet Setting</h2>
          </center><br />
          <h3>Address</h3>
          <Row align='middle' gutter={[8,8]}>
            <Col>
              <p>{account}</p>
            </Col>
            <Col>
              <Button onClick={() => setConfirmModal(true)} type='ghost' className='modal-account-btnRemove'>Remove Wallet</Button>
            </Col>
          </Row><br/>
          <h3>Type</h3>
          <p>{type}</p>
          <br/>
          { type === 'Selendra' &&
            <Form
              layout='vertical'
              className='modal-account-form'
              onFinish={changePassword}
            >
              <center>
                <h3>Change Password</h3><br/>
              </center>
              <Form.Item 
                name='oldPass' 
                label='Current Password'
                rules={[
                  { required: true, 
                    message: 'Please Input Current Password!'
                  }
                ]} 
              >
                <Input.Password size='large'/>
              </Form.Item>
              <Form.Item 
                name='newPass' 
                label='New Password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password!',
                  },
                ]}
                hasFeedback  
              >
                <Input.Password size='large' />
              </Form.Item>
              <Form.Item 
                name='confirmPass' 
                label='Confirm New Password'
                dependencies={['newPass']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your new password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPass') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password size='large' />
              </Form.Item>
              <Form.Item>
                <Button size='large' htmlType='submit'>Change Password</Button>
              </Form.Item>
            </Form>
          }
        </div>
      </Modal>
    </div>
  )
}
