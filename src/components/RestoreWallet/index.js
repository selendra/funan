import { useState } from "react";
import { Form, Row, Col } from "antd";
import { toast } from "react-hot-toast";
import { Modal, Input, Button } from 'globalComponents';
import { useNavigate } from "react-router-dom";
import keyring from "@polkadot/ui-keyring";
import Mnemonic from "./mnemonic";
import PrivateKey from "./private-key";
import { isValidSubstratePassword } from "../../utils";
import keystore from "assets/icons/keystore.svg";
import mnemonic from "assets/icons/mnemonic.svg";
import close from "assets/icons/close.svg";
import upload from "assets/icons/upload.svg";

export default function RestoreWallet({ visible, setVisible }) {
  const navigate = useNavigate();
  const [restoreWallet, setRestoreWallet] = useState("keystore");
  const [unlockWallet, setUnlockWallet] = useState(true);
  const [password, setPassword] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [files, setFiles] = useState();

  const handleRestoreWallet = (value) => {
    setRestoreWallet(value);
  };

  const handleUnlockWallet = () => {
    setUnlockWallet(false);
    setPassword(true);
    setCompleted(false);
  };
  const handlePassword = () => {
    setUnlockWallet(false);
    setPassword(false);
    setCompleted(true);
  };
  const handleCompleted = () => {
    setUnlockWallet(false);
    setPassword(false);
    setCompleted(false);
  };


  const handleFileChosen = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    fileReader.onload = e => {
      setFiles(e.target.result);
    };
  }

  async function handleRestore(val) {
    if(!isValidSubstratePassword(val.password))
      return toast.error('Incorrect password!');
    try {
      const json = JSON.parse(files);
      const pair = keyring.restoreAccount(json, val.password);
      toast.success('Wallet Restored!');
      setVisible(false);
      navigate('/home');
    } catch (error) {
      toast.error('something went wrong!');
      console.log(error);
    }
  }

  // === >>> Keystore <<< ===
  function Keystore() {
    return (
      <div>
        <label className="restore-wallet-btnUpload" htmlFor="upload">
          { files ? 
            JSON.parse(files).address 
            : 
            <Row justify="center" align="middle">
              <img alt='' src={upload} width={24} />
              Upload keystore file
            </Row>
          }
        </label>
        <input
          id="upload"
          type="file"
          label="JSON File"
          accept=".json"
          onChange={handleFileChosen}
          hidden
        />
        <br/>
        <Form
          layout="vertical"
          onFinish={handleRestore}
        >
          <Form.Item label="Wallet password" name="password">
            <Input.Password medium placeholder='Enter wallet password' />
          </Form.Item>
          <Form.Item>
            <Button.Primary 
              block 
              medium 
              htmlType="submit" 
            >Restore</Button.Primary>
          </Form.Item>
        </Form>
      </div>
    );
  }

  return (
    <Modal
      visible={visible}
      closable={false}
      width={600}
      afterClose={() => {
        setUnlockWallet(true);
        setPassword(false);
        setCompleted(false);
      }}
    >
      <Row justify="end">
        <img 
          alt=''
          src={close}
          width={32}
          style={{cursor: 'pointer'}}
          onClick={() => setVisible(false)}
        />
      </Row>
      { unlockWallet && (
        <Row justify="center">
          <Col>
            <div
              className={`
                restore-wallet-card 
                ${restoreWallet === "keystore" && "restore-wallet-card-active"}
              `}
              onClick={() => handleRestoreWallet("keystore")}
            >
              <img
                src={keystore}
                alt="Keystore"
                height={60}
              />
              <p>Keystore</p>
            </div>
          </Col>
          <Col>
            <div
              className={`
                restore-wallet-card 
                ${restoreWallet === "mnemonic" && "restore-wallet-card-active"}
              `}
              onClick={() => handleRestoreWallet("mnemonic")}
            >
              <img src={mnemonic} alt="Mnemonic" height={60} />
              <p>Mnemonic</p>
            </div>
          </Col>
        </Row>
      )}

      { restoreWallet === "keystore" ? (
        <Keystore />
      ) : restoreWallet === "mnemonic" ? (
        <Mnemonic
          handleUnlockWallet={handleUnlockWallet}
          unlockWallet={unlockWallet}
          handlePassword={handlePassword}
          password={password}
          handleCompleted={handleCompleted}
          completed={completed}
          setVisible={setVisible}
        />
      ) : (
        <PrivateKey
          handleUnlockWallet={handleUnlockWallet}
          unlockWallet={unlockWallet}
          handlePassword={handlePassword}
          password={password}
          handleCompleted={handleCompleted}
          completed={completed}
        />
      )}
    </Modal>
  );
}
