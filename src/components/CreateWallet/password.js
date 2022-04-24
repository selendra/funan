import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

export default function CreatePassword() {
  return (
    <>
      <div className="restore-wallet-section">
        <h3>Set the password for your wallet </h3>
        <Form
          name="basic"
          layout="vertical"
          size="large"
          className="input-back"
        >
          <Form.Item label="Set a new password" name="username">
            <Input.Password />
            <p>
              Make sure to enter at least 8 and max 200 characters, including
              one upper-case letter, a symbol and a number{" "}
            </p>
          </Form.Item>
          <Form.Item label="Re-enter password" name="username">
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>
              I understand that I will need this password to verify all
              transactions within my wallet. I will safely store the password.{" "}
            </Checkbox>
          </Form.Item>

          <center>
            <Button
              type="primary"
              className="btn-wallet"
              // disabled={unlockWallet}
            >
              Download keystore file and continue
            </Button>
          </center>
        </Form>
      </div>
    </>
  );
}
