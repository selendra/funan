import { createContext, useEffect, useState } from "react";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext();
export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [hasEVMWallet, setHasEVMWallet] = useState(null);
  const [isTrust, setIsTrust] = useState(
    false || localStorage.getItem("wallet") === "walletconnect"
  );
  // const [substrateAccount, setSubstrateAccount] = useState([]);
  // const [substrateAccountActive, setSubstrateAccountActive] = useState(
  //   localStorage.getItem('park-substrate-active-account') || ''
  // );
  // const [hasSelWallet, setHasSelWallet] = useState(null);

  function disconnect() {
    setAccount("");
    localStorage.setItem("wallet", "");
  }

  async function connectMetamask() {
    const { ethereum } = window;
    if (!ethereum) {
      return;
    }
    try {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setAccount(accounts[0]);
          setIsTrust(false);
          setHasEVMWallet(true);
          localStorage.setItem("wallet", "metamask");
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function connectTrust() {
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed.binance.org",
        },
        qrcodeModalOptions: {
          mobileLinks: ["trust"],
        },
      });
      // enable session (triggers qr code modal)
      await provider.enable();

      const web3provider = new providers.Web3Provider(provider);
      const accounts = await web3provider.listAccounts();

      setAccount(accounts[0]);
      setIsTrust(true);
      setHasEVMWallet(true);
      localStorage.setItem("wallet", "walletconnect");
    } catch (error) {
      // console.log(error);
    }
  }

  // async function connectSubstrate() {
  //   try {
  //     const extension = await web3Enable("Selendra Funan");
  //     if (extension.length === 0) {
  //       setHasSelWallet(false);
  //       return;
  //     } else {
  //       const allAccounts = await web3Accounts({ss58Format: 204});
  //       const reArray = allAccounts.map((i) => {
  //         const newArr = {};
  //         newArr.name = i.meta.name;
  //         newArr.label = i.address;
  //         newArr.value = i.address;
  //         return newArr;
  //       });
  //       console.log(allAccounts)
  //       setSubstrateAccount(reArray);
  //       setHasSelWallet(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  
  useEffect(() => {
    if(isTrust) {
      connectTrust()
    } else if(localStorage.getItem('wallet') === 'metamask') {
      connectMetamask();
    }
  }, [isTrust, hasEVMWallet]);

  return (
    <AccountContext.Provider
      value={{
        account,
        isTrust,
        hasEVMWallet,
        connectMetamask,
        connectTrust,
        disconnect,
        // substrateAccount,
        // substrateAccountActive,
        // hasSelWallet,
        // connectSubstrate,
        // setSubstrateAccountActive,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
