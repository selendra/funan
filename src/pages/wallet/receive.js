import { Button, message, Row } from 'antd';
import { QRCode } from 'react-qrcode-logo'
import { CopyToClipboard } from "react-copy-to-clipboard";
import LayoutComponent from '../../components/Layout'
import WalletMenu from '../../components/WalletMenu'
import { ReactComponent as Copy } from "../../../public/icons/bulk/copy.svg";
import Icon from "@ant-design/icons";
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';

const CopyIcon = (props) => <Icon component={Copy} {...props} />;

export default function Receive() {
  const { substrateAccountActive } = useContext(AccountContext);

  return (
    <LayoutComponent>
      <WalletMenu>
        <center>
          <QRCode value={substrateAccountActive} />
          <Row gutter={[16, 16]} justify='center' align='middle'>
            <p>{substrateAccountActive}</p>
            <CopyToClipboard text={substrateAccountActive}>
              <Button
                type="link"
                icon={<CopyIcon />}
                style={{ paddingLeft: "0" }}
                onClick={() => message.success("Copied")}
              >
                Copy
              </Button>
            </CopyToClipboard>
          </Row>
        </center>
      </WalletMenu>
    </LayoutComponent>
  )
}
