import React from "react";
import { Alert, Checkbox, Form, Input } from "antd";

export default function SetPassword({ form, setForm, error, setError }) {
  React.useEffect(() => {
    if(!form.username) return setError('Please input username!');
    if(!form.password) return setError('Please input password!');
    if(form.password !== form.password_con) return setError('Password not match!');
    else return setError('');
  },[
    form.username,
    form.password,
    form.password_con,
    setError
  ]);

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
                password: form.password,
                password_con: form.password_con
              })}
            />
          </Form.Item>
          <Form.Item className="input-back" label="Set a new password" name="username">
            <Input.Password 
              onChange={e => setForm({
                username: form.username,
                password: e.target.value,
                password_con: form.password_con
              })}
            />
            <p>
              Make sure to enter at least 8 and max 200 characters, including
              one upper-case letter, a symbol and a number{" "}
            </p>
          </Form.Item>
          <Form.Item className="input-back" label="Re-enter password" name="username">
            <Input.Password 
              onChange={e => setForm({
                username: form.username,
                password: form.password,
                password_con: e.target.value
              })}
            />
          </Form.Item>
          { error &&
            <Alert message={error} type="error" style={{borderRadius: '8px'}} showIcon />
          }
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
