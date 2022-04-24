import { Modal } from "antd";
import CreatePassword from "./password";

export default function CreateWallet({
  setCreateWalletVisible,
  createWalletVisible,
}) {
  return (
    <>
      <Modal
        title={<div className="modal-title-section">Create a new wallet</div>}
        visible={createWalletVisible}
        onOk={() => setCreateWalletVisible(false)}
        onCancel={() => setCreateWalletVisible(false)}
        footer={null}
        width={600}
      >
        <CreatePassword />
      </Modal>
    </>
  );
}
