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

  const styling = {
    width: '100%',
    height: '50px',
    lineHeight: '50px',
    margin: '8px 0',
    borderRadius: '16px'
    // padding: '10px'
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
              <Radio.Button value={i.value} className='modal-select-account-item'>{i.value}</Radio.Button>
            </div>
          )}
        </Radio.Group>
      </center>
    </Modal>
  )
}
