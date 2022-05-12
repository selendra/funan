import React, { useContext } from 'react';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { useSubstrateState } from '../context/SubstrateContext';
import { AccountContext } from '../context/AccountContext';

export default function ModalAccount({
  visible, 
  setVisible,
  account,
  type
}) {
  const { keyring } = useSubstrateState();
  const { disconnect } = useContext(AccountContext);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [passwordModal, setPasswordModal] = React.useState(false);

  function forgetAccount() {
    try {
      if(type === 'Selendra') {
        keyring.forgetAccount(account);
        setConfirmModal(false);
        setVisible(false);
      } else {
        disconnect();
        setConfirmModal(false);
        setVisible(false);
      }
    } catch (error) {
      console.log(error);      
    }
  }

  function exportWallet(val) {
    if(!account) return;
    try {
      const addressKeyring = account && keyring.getPair(account);
      const json = addressKeyring && keyring.backupAccount(addressKeyring, val.password);
      
      const strJSON = JSON.stringify(json);
      const blob = new Blob([strJSON], { type: "application/json" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = `${json.address}.json`;
      link.click();
      setPasswordModal(false);
    } catch (error) {
      message.error('Make sure your password is correct!');
      return;
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
      {/* modal confirm before remove wallet */}
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
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Button type='ghost' className='send-cancel' onClick={() => setConfirmModal(false)}>Cancel</Button>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Button className='send-transfer' onClick={forgetAccount}>Remove</Button>
          </Col>
        </Row>
      </Modal>
      {/* modal ask for password to export wallet */}
      <Modal
        title={false}
        visible={passwordModal}
        footer={false}
        closable={false}
        onCancel={() => setPasswordModal(false)}
        className='modal-select-account'
      >
        <div>
          <center>
            <h2>Export Wallet</h2>
          </center>
          <Form
            layout='vertical'
            className='modal-account-form'
            onFinish={exportWallet}
          >
            <Form.Item name='password' label='Password'>
              <Input.Password size='large' />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' size='large'>Export Wallet</Button>
            </Form.Item>
          </Form>
        </div>
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
            <Col span={24}>
              <p>{account}</p>
            </Col>
            { type === 'Selendra' &&
              <Col>
                <Button onClick={() => setPasswordModal(true)} type='ghost' className='modal-account-btnExport'>Export Wallet</Button>
              </Col>
            }
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
