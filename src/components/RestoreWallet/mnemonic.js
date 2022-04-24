import React from "react";
import { Button, Form, Input } from "antd";
import SetPassword from "./setPassword";
import CompleteStep from "./complete";

export default function Mnemonic({
  handleUnlockWallet,
  unlockWallet,
  password,
  handlePassword,
  completed,
  handleCompleted,
}) {
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
            name="username"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      )}

      {password && <SetPassword />}
      {completed && <CompleteStep />}

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
            // disabled={unlockWallet}
          >
            Unlock Wallet
          </Button>
        </center>
      )}
    </div>
  );
}
