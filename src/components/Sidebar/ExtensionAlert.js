import { useContext, useEffect, useState } from 'react';
import { Modal } from 'globalComponents';
import { BrowserView } from 'react-device-detect';
import { AccountContext } from "../../context/AccountContext";

export default function ExtensionAlert() {
  const { hasEVMWallet } = useContext(AccountContext);
  const [userBrowser, setUserBrowser] = useState("");


  useEffect(() => {
    let userAgent = navigator.userAgent;
    if (userAgent.match(/chrome|chromium|crios/i)) {
      setUserBrowser("chrome");
    } else if (userAgent.match(/firefox|fxios/i)) {
      setUserBrowser("firefox");
    } else {
      setUserBrowser("No browser detection");
    }
  }, []);

  return (
    <div>
      {/* === >>> If EVM Extension not found <<< === */}
      <BrowserView>
        <Modal
          title={false}
          visible={hasEVMWallet === false}
          footer={false}
          closable={false}
          className='modal-select-account'
        >
          <center>
            <p>
              EVM Extension is required!{" "}
              { userBrowser === "chrome" ?
                <a
                  href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>Download Now</b>
                </a>
                : 
                <a
                  href="https://addons.mozilla.org/en-US/firefox/addon/selendra-extension/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>Download Now</b>
                </a>
              }
            </p>
          </center>
        </Modal>
      </BrowserView>
    </div>
  )
}
