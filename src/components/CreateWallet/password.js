import React, { useEffect } from "react";
import { Alert, Button, Checkbox, Col, Form, Input, message, Row, Steps } from "antd";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { CopyToClipboard } from "react-copy-to-clipboard";
import keyring from "@polkadot/ui-keyring";
import { useNavigate } from "react-router-dom";

export default function CreatePassword({setCreateWalletVisible}) {
  const navigate = useNavigate();
  const [current, setCurrent] = React.useState(0);
  const [random, setRandom] = React.useState();
  const [verify, setVerify] = React.useState('');
  const [error, setError]= React.useState('');
  const [mnemonic, setMnemonic] = React.useState({
    string: '',
    array: []
  });
  const [form, setForm] = React.useState({
    username: '',
    password: '',
    password_con: ''
  })

  useEffect(() => {
    getRandomIndex();
    generateMnemonic();
  },[]);

  function generateMnemonic() {
    const seed = mnemonicGenerate(12);
    const arr = seed.split(' ');
    setMnemonic({
      string: seed,
      array: arr
    })
  }

  function getRandomIndex() {
    setRandom(Math.floor(Math.random() * 9))
  }

  function next() {
    if(!form.username) return setError('Please input username!');
    if(!form.password) return setError('Please input password!');
    if(form.password !== form.password_con) return setError('Password not match!');
    setCurrent(current + 1);
  }

  function handleComplete() {
    try {
      const { pair, json } = keyring.addUri(
        mnemonic.string,
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
      message.success('Done!');
      setCreateWalletVisible(false);
      navigate('/home');
    } catch (error) {
      // console.log(error);
      message.error('Something went wrong!');
    }
  }

  const steps = [
    {
      title: 'First',
      content: (
        <div className="restore-wallet-section">
          <Form
            name="basic"
            layout="vertical"
            size="large"
          >
            <Form.Item className="input-username" label="Set a username">
              <Input 
                value={form.username}
                onChange={e => setForm({
                  username: e.target.value,
                  password: form.password,
                  password_con: form.password_con
                })}
              />
            </Form.Item>
            <Form.Item className="input-back" label="Set a new password">
              <Input.Password 
                value={form.password}
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
            <Form.Item className="input-back" label="Re-enter password">
              <Input.Password 
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
      ),
    },
    {
      title: 'Second',
      content: (
        <div>
          <h2>Setup Your Secure Mnemonic</h2>
          <p>Write down the following words in order and keep them somewhere safe. Anyone with access to it will also have access to your account! You’ll be asked to verify your Mnemonic next.</p>
          <Row justify="space-around" className="create-mnemonic">
            { mnemonic && mnemonic.array.map((i, key) => 
              <Col span={6} className="each-mnemonic">
                <p>{key + '. ' + i}</p>
              </Col>
            )}
          </Row><br />
          <Row gutter={[16, 16]}>
            <Col>
              <Button
                type="primary"
                className="btn-wallet"
                // disabled={unlockWallet}
                onClick={generateMnemonic}
              >
                Generate New
              </Button>
            </Col>
            <Col>
              <CopyToClipboard text={mnemonic.string}>
                <Button
                  type="primary"
                  className="btn-wallet"
                  onClick={() => message.success("Copied")}
                >
                  Copy
                </Button>
              </CopyToClipboard>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: 'Last',
      content: (
        <div>
          <h2>Verify Phrase</h2>
          <p>Enter the following word from your mnemonic phrase to complete the setup process.</p>
          <Form
            layout="vertical"
            size="large"
          >
            <Form.Item className="input-username" label={`Word #${random}`}>
              <Input 
                value={verify}
                onChange={e => setVerify(e.target.value)}
              />
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Steps current={current}>
        {steps.map(item => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <center>
        { current < steps.length - 1 && (
          <Button
            type="primary"
            className="btn-wallet"
            style={{width: '100%'}}
            // disabled={unlockWallet}
            onClick={next}
          >
            Next
          </Button>
        )}
        { current === steps.length - 1 && ( 
          <Button
            type="primary"
            className="btn-wallet"
            style={{width: '100%'}}
            disabled={ verify !== mnemonic.array[random] }
            onClick={handleComplete}
          >
            Complete
          </Button>
        )}
      </center>
    </div>
  );
}
