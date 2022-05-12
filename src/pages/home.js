import { useContext, useEffect, useState } from "react";
import { Card } from "antd";
import { ethers } from "ethers";
import { AccountContext } from "../context/AccountContext";
import { tokens } from "../constants/tokenContract";
import Wallet from "../components/Wallet";
import LayoutComponent from "../components/Layout";
import TokenBalance from "../components/TokenBalance";
import busd from "../assets/tokens/busd.png";
import usdt from "../assets/tokens/usdt.png";
import dai from "../assets/tokens/dai.png";
import eth from "../assets/tokens/eth.png";
import bnb from "../assets/tokens/bnb.png";
import AccountSelector from "../components/AccountSelector";
import { useAccounts } from "../hooks/useAccounts";

export default function Home() {
  const { allAccounts } = useAccounts();
  const { account: accountContext, isTrust } = useContext(AccountContext);
  const [account, setAccount] = useState(accountContext);
  const [keyringOptions, setKeyringOptions] = useState([]);
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setAccount(accountContext);
  },[accountContext]);
  
  useEffect(() => {
    // Get the list of accounts
    const keyringOptions = 
    allAccounts.map((account) => ({
      key: account,
      value: account,
      icon: 'user',
    }));

    setKeyringOptions(keyringOptions);
  },[allAccounts]);

  useEffect(() => {
    if (!account) return;
    async function getBalance() {
      const tokenABI = ["function balanceOf(address) view returns (uint)"];
      const provider = ethers.getDefaultProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
      );
      setLoading(true);
      const BUSD = new ethers.Contract(
        tokens[0].tokenAddress,
        tokenABI,
        provider
      );
      const DAI = new ethers.Contract(
        tokens[1].tokenAddress,
        tokenABI,
        provider
      );
      const USDT = new ethers.Contract(
        tokens[2].tokenAddress,
        tokenABI,
        provider
      );
      const ETH = new ethers.Contract(
        tokens[3].tokenAddress,
        tokenABI,
        provider
      );

      const data = await Promise.all([
        BUSD.balanceOf(account),
        DAI.balanceOf(account),
        USDT.balanceOf(account),
        ETH.balanceOf(account),
        provider.getBalance(account)
      ]);
      const newArr = data.map((x) => ({
        value: x._hex,
      }));
      setBalance(newArr);
      setLoading(false);
    }
    getBalance();
  }, [account]);

  return (
    <LayoutComponent>
      <p className="profile-home">Home</p>
      <Card style={{ borderRadius: "8px" }} className="sel-card">
        <AccountSelector 
          keyringOptions={keyringOptions} 
        />
      </Card>

      <p className="profile-home">Wallet</p>
      <div>
        { !account && keyringOptions.length === 0 &&
          <p>You don't have any wallet yet.</p>
        }
        {/* Metamask wallet */}
        { account &&
          <Wallet account={account} type={isTrust ? 'Trust Wallet' : 'Metamask'} />
        }
        {/* Selendra wallet */}
        { keyringOptions.length > 0 &&
          keyringOptions.map((account, key) => (
            <Wallet key={key} account={account.value} type="Selendra" />
          ))
        }
      </div>

      <p className="profile-home">Assets</p>
      <div className="profile-desc">
        <Card style={{ borderRadius: "8px" }}>
          {account ? (
            <div>
              <TokenBalance
                image={usdt}
                TokenName="USDT"
                balance={balance[2]?.value}
                loading={loading}
              />
              <TokenBalance
                image={busd}
                TokenName="BUSD"
                balance={balance[0]?.value}
                loading={loading}
              />
              <TokenBalance
                image={dai}
                TokenName="DAI"
                balance={balance[1]?.value}
                loading={loading}
              />
              <TokenBalance
                image={eth}
                TokenName="ETH"
                balance={balance[3]?.value}
                loading={loading}
              />
              <TokenBalance
                image={bnb}
                TokenName="BNB"
                balance={balance[4]?.value}
                loading={loading}
              />
            </div>
          ):(
            <p>Please connect your evm wallet.</p>
          )}
        </Card>
      </div>
    </LayoutComponent>
  );
}
