import { useContext, useState } from "react";
import { Modal, Radio } from "antd";
import { AccountContext } from "../context/AccountContext";

export default function ModalSelectAccount({accounts, visible, setVisible}) {
  const [currentActive, setCurrentActive] = 
    useState(localStorage.getItem("park-substrate-active-account") || "");
  const { setSubstrateAccountActive } = useContext(AccountContext);

  function handleChange(e) {
    // const obj = {
    //   "name": e.target.value.name,
    //   "label": e.target.value.value,
    //   "value": e.target.value.value
    // };

    const { value } = e.target;
    localStorage.setItem("park-substrate-active-account", value);
    setSubstrateAccountActive(value);
    setCurrentActive(value);
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
        <Radio.Group value={currentActive} onChange={handleChange}>
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
