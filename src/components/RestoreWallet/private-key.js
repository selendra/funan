import React from "react";
import { Button, Form, Input } from "antd";
import SetPassword from "./setPassword";
import CompleteStep from "./complete";

export default function PrivateKey({
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
          <Form.Item label="Please type in your private key" name="username">
            <Input.Password />
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
