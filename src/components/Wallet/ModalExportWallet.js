import React from 'react'
import { Form } from 'antd';
import { toast } from 'react-hot-toast';
import { Modal, Input, Button } from 'globalComponents';
import { useSubstrateState } from 'context/SubstrateContext';

export default function ModalExportWallet({
  visible,
  setVisible,
  account
}) {
  const { keyring } = useSubstrateState();

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
      setVisible(false);
    } catch(e) {
      toast.error('Make sure your password is correct!');
    }
  }

  return (
    <Modal
      closable={false}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <center>
          <h2>Export Wallet</h2>
        </center>
        <Form
          layout='vertical'
          onFinish={exportWallet}
        >
          <Form.Item name='password' label='Password'>
            <Input.Password size='large' placeholder='Enter Password' />
          </Form.Item>
          <Form.Item style={{margin: '0'}}>
            <Button.Primary 
              block 
              htmlType='submit'
            >Export Wallet</Button.Primary>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
