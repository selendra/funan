import { useState } from "react";
import { Button, Modal, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import keyring from "@polkadot/ui-keyring";
import Mnemonic from "./mnemonic";
import PrivateKey from "./private-key";
import { isValidSubstratePassword } from "../../utils";

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
      return message.error('Incorrect password!');
    try {
      const json = JSON.parse(files);
      const pair = keyring.restoreAccount(json, val.password);
      message.success('Done!');
      setVisible(false);
      navigate('/home');
    } catch (error) {
      message.error('something went wrong!');
      console.log(error);
    }
  }
  // const MnemonicSteps = [{ component: <StepOne /> }];

  // === >>> Keystore <<< ===
  function Keystore() {
    return (
      <div className="restore-wallet-section">
        <label className="btn-upload" for="upload">{files ? JSON.parse(files).address : 'Upload keystore file'}</label>
        <input
          id="upload"
          type="file"
          label="JSON File"
          accept=".json"
          onChange={handleFileChosen}
          hidden
        />
        <Form
          name="basic"
          layout="vertical"
          size="large"
          className="input-back"
          onFinish={handleRestore}
        >
          <Form.Item label="Enter your wallet password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="restore-btn">Restore</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  return (
    <>
      <Modal
        title={<div className="modal-title-section">Restore wallet</div>}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        width={600}
        afterClose={() => {
          setUnlockWallet(true);
          setPassword(false);
          setCompleted(false);
        }}
      >
        {unlockWallet && (
          <div className="modal-content">
            <div
              className={`restore-wallet-card ${
                restoreWallet === "keystore" && "active"
              }`}
              onClick={() => handleRestoreWallet("keystore")}
            >
              <img
                src="/icons/bulk/mobile-programming.svg"
                alt="Keystore"
                height={60}
              />
              <p>Keystore</p>
            </div>
            <div
              className={`restore-wallet-card ${
                restoreWallet === "mnemonic" && "active"
              }`}
              onClick={() => handleRestoreWallet("mnemonic")}
            >
              <img src="/icons/bulk/note.svg" alt="Mnemonic" height={60} />
              <p>Mnemonic</p>
            </div>
            <div
              className={`restore-wallet-card ${
                restoreWallet === "private-key" && "active"
              }`}
              onClick={() => handleRestoreWallet("private-key")}
            >
              <img src="/icons/bulk/key-blue.svg" alt="Private" height={60} />
              <p>Private Key</p>
            </div>
          </div>
        )}

        {restoreWallet === "keystore" ? (
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
    </>
  );
}
