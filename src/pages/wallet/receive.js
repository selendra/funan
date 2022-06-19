import Icon from "@ant-design/icons";
import { QRCode } from "react-qrcode-logo";
import { Button, Col, message, Row } from 'antd';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSubstrateState } from '../../context/SubstrateContext';
// import { ReactComponent as Copy } from "../../../public/icons/bulk/copy.svg";
import WalletMenu from "../../components/WalletMenu";

// const CopyIcon = (props) => <Icon component={Copy} {...props} />;
const address = (addr) => addr ? addr.address : '';

export default function Receive() {
  const { currentAccount } = useSubstrateState();

  return (
    <WalletMenu>
      { currentAccount ?
        <Row gutter={[16, 16]} justify='center'>
          <center>
            <QRCode size={200} value={address(currentAccount)} />
            <Row justify="space-between">
              <Col>
                <p>Address:</p>
              </Col>
              <Col>
                <CopyToClipboard text={address(currentAccount)}>
                  <Button
                    type="link"
                    // icon={<CopyIcon />}
                    style={{ padding: '0 8px' }}
                    onClick={() => message.success("Copied")}
                  >
                    <span style={{fontWeight: '500'}}>Copy</span>
                  </Button>
                </CopyToClipboard>
              </Col>
            </Row>
            <Row className="receive-address-container" gutter={[0, 16]}>
              <p className='receive-address'>{address(currentAccount)}</p>
            </Row>
          </center>
        </Row>
        :
        <p>Look like you don't have Selendra wallet yet.</p>
      }
    </WalletMenu>
  )
}
