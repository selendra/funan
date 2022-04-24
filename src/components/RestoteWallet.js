import { useContext, useState } from "react";
import { Button, Modal, Input, Form, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../context/AccountContext";
import Mnemonic from "./RestoreWallet/mnemonic";
import PrivateKey from "./RestoreWallet/private-key";

export default function RestoreWallet({ visible, setVisible }) {
  let navigate = useNavigate();
  const { account, substrateAccount } = useContext(AccountContext);

  const [restoreWallet, setRestoreWallet] = useState("keystore");
  const [unlockWallet, setUnlockWallet] = useState(true);
  const [password, setPassword] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (substrateAccount.length !== 0 || account) navigate("/home");

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

  // const MnemonicSteps = [{ component: <StepOne /> }];

  // === >>> Keystore <<< ===
  function Keystore() {
    return (
      <div className="restore-wallet-section">
        <div className="btn-upload">Upload keystore file</div>
        <Form
          name="basic"
          layout="vertical"
          size="large"
          className="input-back"
        >
          <Form.Item label="Enter your wallet password" name="username">
            <Input.Password />
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
