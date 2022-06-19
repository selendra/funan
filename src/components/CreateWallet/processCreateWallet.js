import { useEffect, useState } from "react";
import { Input, Button } from "globalComponents";
import { Alert, Checkbox, Col, Form, message, Row, Steps } from "antd";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { CopyToClipboard } from "react-copy-to-clipboard";
import keyring from "@polkadot/ui-keyring";
import { useNavigate } from "react-router-dom";
import copy from "assets/icons/copy.svg";
import refresh from "assets/icons/refresh.svg";

export default function ProcessCreateWallet({ setVisible }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [random, setRandom] = useState();
  const [verify, setVerify] = useState("");
  const [error, setError] = useState("");
  const [mnemonic, setMnemonic] = useState({
    string: "",
    array: [],
  });
  const [form, setForm] = useState({
    username: "",
    password: "",
    password_con: "",
  });

  useEffect(() => {
    getRandomIndex();
    generateMnemonic();
  }, []);

  function generateMnemonic() {
    const seed = mnemonicGenerate(12);
    const arr = seed.split(" ");
    setMnemonic({
      string: seed,
      array: arr,
    });
  }

  function getRandomIndex() {
    setRandom(Math.floor(Math.random() * 9));
  }

  function next() {
    if (!form.username) return setError("Please input username!");
    if (!form.password) return setError("Please input password!");
    if (form.password !== form.password_con)
      return setError("Password not match!");
    setCurrent(current + 1);
  }

  function handleComplete() {
    try {
      const { pair, json } = keyring.addUri(
        mnemonic.string,
        form.password,
        { name: form.username },
        "sr25519"
      );
      const strJSON = JSON.stringify(json);
      const blob = new Blob([strJSON], { type: "application/json" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = `${json.address}.json`;
      link.click();
      message.success("Done!");
      setVisible(false);
      navigate("/home");
      // loadAccounts(state, dispatch);
    } catch (error) {
      // console.log(error);
      message.error("Something went wrong!");
    }
  }

  const steps = [
    {
      title: "First",
      content: (
        <div>
          <Form name="basic" layout="vertical">
            <Form.Item label="Set a username">
              <Input.Text
                medium
                value={form.username}
                onChange={(e) =>
                  setForm({
                    username: e.target.value,
                    password: form.password,
                    password_con: form.password_con,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Set a new password">
              <Input.Password
                medium
                value={form.password}
                onChange={(e) =>
                  setForm({
                    username: form.username,
                    password: e.target.value,
                    password_con: form.password_con,
                  })
                }
              />
              <p>
                Make sure to enter at least 8 and max 200 characters, including
                one upper-case letter, a symbol and a number{" "}
              </p>
            </Form.Item>
            <Form.Item label="Re-enter password">
              <Input.Password
                medium
                value={form.password_con}
                onChange={(e) =>
                  setForm({
                    username: form.username,
                    password: form.password,
                    password_con: e.target.value,
                  })
                }
              />
            </Form.Item>
            {error && (
              <Alert
                message={error}
                type="error"
                style={{ borderRadius: "8px" }}
                showIcon
              />
            )}
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
      title: "Second",
      content: (
        <div>
          <h2>Setup Your Secure Mnemonic</h2>
          <p>
            Write down the following words in order and keep them somewhere
            safe. Anyone with access to it will also have access to your
            account! You’ll be asked to verify your Mnemonic next.
          </p>
          <br />
          <Row justify="space-between">
            { mnemonic &&
              mnemonic.array.map((i, key) => 
                <Col span={6} className="each-mnemonic-word">
                  <p>{(key + 1) + ". " + i}</p>
                </Col>
              )
            }
          </Row>
          <br />
          <Row justify="end" gutter={[16, 16]}>
            <Col>
              <Button.Outline
                danger
                onClick={generateMnemonic}
              >
                <img src={refresh} alt='' width={14} height={14} />
                Generate New
              </Button.Outline>
            </Col>
            <Col>
              <CopyToClipboard text={mnemonic.string}>
                <Button.Outline
                  primary
                  onClick={() => message.success("Copied")}
                >
                  <img src={copy} alt='' width={14} height={14} />
                  Copy
                </Button.Outline>
              </CopyToClipboard>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Last",
      content: (
        <div>
          <h2>Verify Phrase</h2>
          <p>
            Enter the following word from your mnemonic phrase to complete the
            setup process.
          </p>
          <Form layout="vertical" size="large">
            <Form.Item label={`Word #${random + 1}`}>
              <Input.Text
                medium
                placeholder='Enter word'
                value={verify}
                onChange={(e) => setVerify(e.target.value)}
              />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Completed",
      content: (
        <div>
          <center>
            <br />
            <img src="/images/success.png" height="200px" alt="" />
            <h1>You're all set!</h1>
            <p style={{ fontSize: "18px" }}>
              You have successfully restored your wallet.
            </p>
          </center>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Steps current={current} className='create-wallet-step'>
        { steps.map(item => 
          <Steps.Step key={item.title} title={item.title} />
        )}
      </Steps>
      <br />
      <div className="steps-content">{steps[current].content}</div>
      <center>
        { current < steps.length - 1 && 
          <Button.Primary
            block
            medium
            disabled={current === 2 && verify !== mnemonic.array[random]}
            onClick={next}
          >Next</Button.Primary>
        }
        { current === steps.length - 1 && 
          <Button.Primary
            block
            medium
            onClick={handleComplete}
          >Complete</Button.Primary>
        }
      </center>
    </div>
  );
}
