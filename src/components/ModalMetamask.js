import { Button, Modal } from 'globalComponents';
import { isAndroid, isChrome, isDesktop, isFirefox, isIOS, isMobile } from 'react-device-detect';

let link;
if(isMobile) {
  if(isIOS) link = 'https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202';
  if(isAndroid) link = 'https://play.google.com/store/apps/details?id=io.metamask&hl=en&gl=US';
} else if(isDesktop) {
  if(isFirefox) link = 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/';
  if(isChrome) link = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';
} 

export default function ModalMetamask({visible, setVisible}) {
  return (
    <Modal
      visible={visible}
      closable={false}
      onCancel={() => setVisible(false)}
    >
      <div>
        <center>
          <h2>Add Metamask Account</h2><br/>
          <p>Metamask not Installed.</p><br/>
          <Button.Primary>
            <a href={link} target='_blank' rel="noreferrer">
              Install Metamask
            </a>
          </Button.Primary>
        </center>
      </div>
    </Modal>
  )
}
