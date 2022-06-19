import { useEffect } from "react";
import { Alert, Checkbox, Form } from "antd";
import { Input } from "globalComponents";

export default function SetPassword({ form, setForm, error, setError }) {
  useEffect(() => {
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
      <div>
        <center>
          <h2>Set up wallet</h2>
        </center>
        <br />
        <Form layout="vertical">
          <Form.Item label="Set a username">
            <Input.Text 
              medium
              value={form.username}
              onChange={e => setForm({
                username: e.target.value,
                password: form.password,
                password_con: form.password_con
              })}
            />
          </Form.Item>
          <Form.Item label="Set a new password">
            <Input.Password 
              medium
              value={form.password}
              onChange={e => setForm({
                username: form.username,
                password: e.target.value,
                password_con: form.password_con
              })}
            />
          </Form.Item>
          <Form.Item label="Re-enter password">
            <Input.Password 
              medium
              value={form.password_con}
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
          <br />
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
