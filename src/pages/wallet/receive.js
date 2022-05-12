import Icon from "@ant-design/icons";
import { QRCode } from "react-qrcode-logo";
import { Button, message, Row } from 'antd';
import { CopyToClipboard } from "react-copy-to-clipboard";
import LayoutComponent from "../../components/Layout";
import WalletMenu from "../../components/WalletMenu";
import { useSubstrateState } from '../../context/SubstrateContext';
import { ReactComponent as Copy } from "../../../public/icons/bulk/copy.svg";

const CopyIcon = (props) => <Icon component={Copy} {...props} />;
const address = (addr) => addr ? addr.address : '';

export default function Receive() {
  const { currentAccount } = useSubstrateState();

  return (
    <LayoutComponent>
      <WalletMenu>
        { currentAccount ?
          <center>
            <QRCode size={200} value={address(currentAccount)} />
            <Row gutter={[16, 16]} justify='center' align='middle' style={{marginTop: '16px'}}>
              <p className='receive-address'>{address(currentAccount)}</p>
              <CopyToClipboard text={address(currentAccount)}>
                <Button
                  type="link"
                  icon={<CopyIcon />}
                  style={{ paddingLeft: "0" }}
                  onClick={() => message.success("Copied")}
                >
                  <span style={{fontWeight: '500', margin: '0'}}>Copy</span>
                </Button>
              </CopyToClipboard>
            </Row>
          </center>
          :
          <p>Look like you don't have Selendra wallet yet.</p>
        }
      </WalletMenu>
    </LayoutComponent>
  )
}
