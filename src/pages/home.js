import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Icon from "@ant-design/icons";
import { useTheme } from "next-themes";
import { Avatar, Badge, Button, Card, Col, Divider, message, Row } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { shortenAddress } from "../utils";
import { AccountContext } from "../context/AccountContext";
import { tokens } from "../constants/tokenContract";
import Wallet from "../components/Wallet";
import LayoutComponent from "../components/Layout";
import TokenBalance from "../components/TokenBalance";
import ButtonConnect from "../components/ButtonConnect";
import ModalSelectAccount from "../components/ModalSelectAccount";
import busd from "../assets/tokens/busd.png";
import usdt from "../assets/tokens/usdt.png";
import dai from "../assets/tokens/dai.png";
import eth from "../assets/tokens/eth.png";
import { ReactComponent as Edit } from "../../public/icons/bulk/edit-2.svg";
import { ReactComponent as Copy } from "../../public/icons/bulk/copy.svg";

const EditIcon = (props) => <Icon component={Edit} {...props} />;
const CopyIcon = (props) => <Icon component={Copy} {...props} />;

export default function Home() {
  const { theme } = useTheme();
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const {
    account,
    substrateAccount,
    substrateAccountActive,
    connectSubstrate,
    setSubstrateAccountActive,
  } = useContext(AccountContext);

  // useEffect(() => {
  //   const account = JSON.parse(localStorage.getItem('park-substrate-active-account'));
  //   if(!account) return;
  //   setSubstrateAccountActive(account);
  // }, [substrateAccountActive]);

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
      <ModalSelectAccount
        accounts={substrateAccount}
        visible={modal}
        setVisible={setModal}
      />
      <p className="profile-home">Home</p>
      <Card style={{ borderRadius: "8px" }} className="sel-card">
        <Row gutter={[8, 8]} align="middle" justify="space-between">
          <Col span={12}>
            <Row gutter={[32, 32]} justify="start">
              <Col xs={12} sm={6}>
                <ButtonConnect
                  className="home-connect-evm"
                  icon="wallet-1.svg"
                  title="Connect EVM"
                />
              </Col>
              <Col xs={12} sm={6}>
                <ButtonConnect
                  className="home-connect-sel"
                  icon={
                    theme === "light"
                      ? "wallet-check.svg"
                      : "wallet-check-dark.svg"
                  }
                  title="Connect Selendra"
                  onClick={connectSubstrate}
                  router={false}
                />
              </Col>
              {/* <Col span={6}>
                <ButtonConnect
                  className="home-create-wallet"
                  icon="wallet-add-1-yellow.svg"
                  title="Create Wallet"
                />
              </Col>
              <Col span={6}>
                <ButtonConnect
                  className="home-restore-wallet"
                  icon="key-pink.svg"
                  title="Restore Wallet"
                />
              </Col> */}
            </Row>
          </Col>
          <Divider
            type="vertical"
            style={{ height: "7em", borderLeft: "2px solid rgba(0,0,0,.07)" }}
          />

          <Col xs={10} sm={11}>
            <Row gutter={[8, 8]} align="middle" justify="center">
              <Col span={6}>
                <Badge dot={true} color="green">
                  <Avatar
                    src={`https://avatars.dicebear.com/api/identicon/${
                      substrateAccount.length > 0 && substrateAccount[0].label
                    }.svg`}
                    size={64}
                    style={{ background: "#FFF" }}
                  />
                </Badge>
              </Col>
              <Col sm={14}>
                {substrateAccount.length !== 0 && (
                  <div>
                    {substrateAccountActive ? (
                      <p>{shortenAddress(substrateAccountActive)}</p>
                    ) : (
                      <p>Please Select Your Selendra Account</p>
                    )}
                    <Row gutter={[8, 8]}>
                      <Button
                        type="link"
                        icon={<EditIcon />}
                        style={{ paddingLeft: "0" }}
                        onClick={() => setModal(true)}
                      >
                        Change
                      </Button>
                      <CopyToClipboard text={substrateAccount[0].label}>
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
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <p className="profile-home">Wallet</p>
      <div>
        <Wallet account={account} type="Metamask" />
        {substrateAccount.length > 0 &&
          substrateAccount.map((account, key) => (
            <Wallet key={key} account={account.label} type="Injection" />
          ))}
      </div>

      <p className="profile-home">Assets</p>
      <div className="profile-desc">
        <Card style={{ borderRadius: "8px" }}>
          {account && (
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
            </div>
          )}
        </Card>
      </div>
    </LayoutComponent>
  );
}
