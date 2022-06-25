import { useState } from "react";
import { Form } from "antd";
import { toast } from "react-hot-toast";
import { Input, Button } from "globalComponents";
import SetPassword from "./setPassword";
import CompleteStep from "./complete";
import keyring from "@polkadot/ui-keyring";
import { mnemonicValidate } from "@polkadot/util-crypto";
import { useNavigate } from "react-router-dom";

export default function Mnemonic({
  handleUnlockWallet,
  unlockWallet,
  password,
  handlePassword,
  completed,
  handleCompleted,
  setVisible,
}) {
  const navigate = useNavigate();
  const [mnemonic, setMnemonic] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
    password_con: "",
  });

  function handleRestoreMnemonic() {
    try {
      const { pair, json } = keyring.addUri(
        mnemonic,
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
      toast.success("Done!");
      setVisible(false);
      navigate("/home");
    } catch (error) {
      toast.error("something went wrong!");
    }
  }

  return (
    <div>
      { unlockWallet && (
        <Form
          name="basic"
          layout="vertical"
          size="large"
        >
          <Form.Item label="Please type in your 12 word mnemonic phrase, all lower-case, separate by single spaces">
            <Input.TextArea
              // status={validateMnemonic(mnemonic) ? "" : "error"}
              rows={4}
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
            />
          </Form.Item>
        </Form>
      )}

      { password && 
        <SetPassword
          form={form}
          setForm={setForm}
          error={error}
          setError={setError}
        />
      }
      { completed && 
        <CompleteStep handleRestore={handleRestoreMnemonic} />
      }

      { !completed &&
        <center>
          <Button.Primary
            block
            medium
            onClick={
              unlockWallet
                ? handleUnlockWallet
                : password
                ? handlePassword
                : handleCompleted
            }
            disabled={mnemonicValidate(mnemonic) && !error ? false : true}
          >
            Unlock Wallet
          </Button.Primary>
        </center>
      }
    </div>
  );
}
