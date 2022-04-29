import Icon from "@ant-design/icons";
import { Button, message, Row } from 'antd';
import { QRCode } from "react-qrcode-logo";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LayoutComponent from "../../components/Layout";
import WalletMenu from "../../components/WalletMenu";
import { ReactComponent as Copy } from "../../../public/icons/bulk/copy.svg";
import { useSubstrateState } from '../../context/SubstrateContext';

const CopyIcon = (props) => <Icon component={Copy} {...props} />;
const address = (addr) => addr ? addr.address : '';

export default function Receive() {
  const { currentAccount } = useSubstrateState();

  return (
    <LayoutComponent>
      <WalletMenu>
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
                <span style={{fontWeight: '500'}}>Copy</span>
              </Button>
            </CopyToClipboard>
          </Row>
        </center>
      </WalletMenu>
    </LayoutComponent>
  )
}
