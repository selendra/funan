import { Modal, Radio } from "antd";

export default function ModalSelectAccount({
  accounts, 
  visible, 
  setVisible,
  keyring,
  currentAccount,
  setCurrentAccount
}) {
  const address = (addr) => addr ? addr.address : '';

  function handleChange(e) {
    const { value } = e.target;
    setCurrentAccount(keyring.getPair(value));
    setVisible(false);
  }

  return (
    <Modal
      title={false}
      visible={visible}
      footer={false}
      closable={false}
      onCancel={() => setVisible(false)}
      className='modal-select-account'
    >
      <center>
        <h2>Choose Account</h2>
        <Radio.Group value={address(currentAccount)} onChange={handleChange}>
          { accounts.map((i, key) => 
            <div style={{margin: '8px 0'}} key={key}>
              <Radio.Button value={i.value} className='modal-select-account-item'>
                <p>{i.value}</p>
              </Radio.Button>
            </div>
          )}
        </Radio.Group>
      </center>
    </Modal>
  )
}
