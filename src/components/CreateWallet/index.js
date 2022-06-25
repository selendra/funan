import { Row } from "antd";
import { Modal } from "globalComponents";
import ProcessCreateWallet from "./processCreateWallet";
import close from "assets/icons/close.svg";

export default function CreateWallet({visible, setVisible}) {
  return (
    <Modal
      visible={visible}
      closable={false}
      width={600}
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
      <center>
        <h2>Create a new wallet</h2>
        <br/>
      </center>

      <ProcessCreateWallet setVisible={setVisible} />
    </Modal>
  );
}
