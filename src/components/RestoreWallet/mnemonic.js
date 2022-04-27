import React from "react";
import { Button, Form, Input, message } from "antd";
import SetPassword from "./setPassword";
import CompleteStep from "./complete";
import keyring from "@polkadot/ui-keyring";
import { mnemonicValidate } from "@polkadot/util-crypto";

export default function Mnemonic({
  handleUnlockWallet,
  unlockWallet,
  password,
  handlePassword,
  completed,
  handleCompleted,
}) {
  const [ mnemonic, setMnemonic ] = React.useState('');
  const [form, setForm] = React.useState({
    username: '',
    password: ''
  });

  function validateMnemonic(str) {
    return mnemonicValidate(str);
  }

  function handleRestoreMnemonic(val) {
    try {
      const { pair, json } = keyring.addUri(
        mnemonic,
        form.password, 
        { name: form.username },
        'sr25519'
      );
  
      const strJSON = JSON.stringify(json);
      const blob = new Blob([strJSON],{type:'application/json'});
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = `${json.address}.json`;
      link.click();
    } catch (error) {
      message.error('something went wrong!');
    }
  }


  return (
    <div className="restore-wallet-section">
      {unlockWallet && (
        <Form
          name="basic"
          layout="vertical"
          size="large"
          className="input-back"
        >
          <Form.Item
            label="Please type in your 12 or 24 word mnemonic phrase, all lower-case, separate by single spaces"
          >
            <Input.TextArea 
              status={validateMnemonic(mnemonic) ? '' : 'error'}
              rows={4} 
              value={mnemonic}
              onChange={e => setMnemonic(e.target.value)}
            />
          </Form.Item>
        </Form>
      )}

      {password && <SetPassword form={form} setForm={setForm} />}
      {completed && <CompleteStep handleRestore={handleRestoreMnemonic} />}

      {!completed && (
        <center>
          <Button
            type="primary"
            className="btn-wallet"
            onClick={
              unlockWallet
                ? handleUnlockWallet
                : password
                ? handlePassword
                : handleCompleted
            }
            disabled={validateMnemonic(mnemonic) ? false : true}
          >
            Unlock Wallet
          </Button>
        </center>
      )}
    </div>
  );
}
