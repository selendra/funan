import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Col, Form, Row } from 'antd';
import { Modal, Input, Button } from 'globalComponents';
import { useSubstrateState } from 'context/SubstrateContext';
import ModalForgetWallet from './ModalForgetWallet';
import ModalExportWallet from './ModalExportWallet';
import exportIcon from 'assets/icons/export.svg';
import trashIcon from 'assets/icons/trash.svg';

export default function ModalAccount({
  visible, 
  setVisible,
  account,
  type
}) {
  const { keyring } = useSubstrateState();
  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  function changePassword(val) {
    try {
      setLoading(true);
      const acc = keyring.getPair(account);
      if (!acc) {
        return setLoading(false);
      }
      try {
        if (!acc.isLocked) {
          acc.lock();
        }

        acc.decodePkcs8(val.oldPass);
      } catch (error) {
        toast.error('Make sure your password is correct!');
        setLoading(false);
        return;
      }
      try {
        keyring.encryptAccount(acc, val.newPass);
        toast.success('successfully changed!');
        setVisible(false);
        setLoading(false);
      } catch (error) {
        toast.error('Make sure your password is correct!');
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      // console.log(error);      
    }
  }

  return (
    <div>
      <Modal
        visible={visible} 
        closable={false}
        onCancel={() => setVisible(false)}
      >
        <div>
          <center>
            <h2>Wallet Setting</h2>
          </center>
          <br />
          <h3>Address</h3>
          <Row align='middle' gutter={[8,8]}>
            <Col span={24}>
              <p>{account}</p>
            </Col>
            <Col>
              { type === 'Selendra' &&
                <Button.Outline
                  primary
                  onClick={() => setPasswordModal(true)} 
                >
                  <img src={exportIcon} alt='' width={14} height={14} />
                  Export Wallet
                </Button.Outline>
              }
            </Col>
            <Col>
              <Button.Outline 
                danger
                onClick={() => setConfirmModal(true)} 
              >
                <img src={trashIcon} alt='' width={14} height={14} />
                Remove Wallet
              </Button.Outline>
            </Col>
          </Row><br/>
          <h3>Type</h3>
          <p>{type}</p>
          <br/>
          { type === 'Selendra' &&
            <Form
              layout='vertical'
              onFinish={changePassword}
            >
              <center>
                <h3>Change Password</h3>
              </center>
              <br/>
              <Form.Item 
                name='oldPass' 
                label='Current Password'
                rules={[
                  { required: true, 
                    message: 'Please Input Current Password!'
                  }
                ]} 
              >
                <Input.Password medium />
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
                <Input.Password medium />
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
                <Input.Password medium />
              </Form.Item>
              <Form.Item>
                <Button.Primary medium block loading={loading} htmlType='submit'>Change Password</Button.Primary>
              </Form.Item>
            </Form>
          }
        </div>
      </Modal>

      <ModalForgetWallet
        visible={confirmModal}
        setVisible={setConfirmModal}
        account={account}
        type={type}
      />
      <ModalExportWallet 
        visible={passwordModal}
        setVisible={setPasswordModal}
        account={account}
      />
    </div>
  )
}
