import { createContext, useEffect, useState } from "react";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const AccountContext = createContext();
export const AccountProvider = ({children}) => {
  const [account, setAccount] = useState('');
  const [isTrust, setIsTrust] = useState(false || localStorage.getItem('wallet') === 'walletconnect');

  function disconnect() {
    localStorage.setItem('wallet', '');
    setAccount('');
  }

  async function connectMetamask() {
    const { ethereum } = window;
    if(!ethereum) return;
    try {
      await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setAccount(accounts[0])
          setIsTrust(false);
          localStorage.setItem('wallet', 'metamask');
        })
    } catch (error) {
      console.log(error);
    }
  }

  async function connectTrust() {
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed.binance.org"
        },
        qrcodeModalOptions: {
          mobileLinks: ["trust"]
        }
      })
      // enable session (triggers qr code modal)
      await provider.enable();

      const web3provider = new providers.Web3Provider(provider);
      const accounts = await web3provider.listAccounts();

      setAccount(accounts[0]);
      setIsTrust(true);
      localStorage.setItem('wallet', 'walletconnect');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    isTrust ? connectTrust() : connectMetamask();
  },[isTrust])

  return (
    <AccountContext.Provider
      value={{
        account,
        isTrust,
        connectMetamask,
        connectTrust,
        disconnect,
      }}
    >{children}</AccountContext.Provider>
  )
}