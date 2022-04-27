import React from "react";
import { Checkbox, Form, Input } from "antd";

export default function SetPassword({ form, setForm }) {
  return (
    <>
      <div className="restore-wallet-section">
        <h3>Set up wallet </h3>
        <Form
          name="basic"
          layout="vertical"
          size="large"
          
        >
          <Form.Item className="input-username" label="Set a username">
            <Input 
              onChange={e => setForm({
                username: e.target.value,
                password: form.password
              })}
            />
          </Form.Item>
          <Form.Item className="input-back" label="Set a new password" name="username">
            <Input.Password 
              onChange={e => setForm({
                username: form.username,
                password: e.target.value
              })}
            />
            <p>
              Make sure to enter at least 8 and max 200 characters, including
              one upper-case letter, a symbol and a number{" "}
            </p>
          </Form.Item>
          <Form.Item className="input-back" label="Re-enter password" name="username">
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>
              I understand that I will need this password to verify all
              transactions within my wallet. I will safely store the password.{" "}
            </Checkbox>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
