import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { Avatar, Card, Col, Radio, Row, Spin, Tabs } from "antd";
import { AccountContext } from "../context/AccountContext";
import { tokens } from "../constants/tokenContract";
import TokenBalance from "../components/TokenBalance";
import sel from "../assets/sel-token.png";
import bnb from "../assets/tokens/bnb.png";
import busd from "../assets/tokens/busd.png";
import usdt from "../assets/tokens/usdt.png";
import dai from "../assets/tokens/dai.png";
import eth from "../assets/tokens/eth.png";

export default function Profile() {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(false);
  const { account } = useContext(AccountContext);

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
    const DAI = new ethers.Contract(tokens[1].tokenAddress, tokenABI, provider);
    const USDT = new ethers.Contract(
      tokens[2].tokenAddress,
      tokenABI,
      provider
    );
    const ETH = new ethers.Contract(tokens[3].tokenAddress, tokenABI, provider);

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

  useEffect(() => {
    if (!account) return;
    getBalance();
  }, [account]);

  return (
    <div>
      <Card style={{ borderRadius: "8px" }} className="sel-card">
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col>
            <Row gutter={[16, 16]}>
              <Col>
                <Avatar
                  src={`https://avatars.dicebear.com/api/identicon/${account}.svg`}
                  size={64}
                />
              </Col>
              <Col>
                <h2 className="user-id">ID: No ID</h2>
                <p>{account}</p>
              </Col>
            </Row>
          </Col>
          <Col>{/* <h2 style={{fontSize: '28px'}}>$ 0</h2> */}</Col>
        </Row>
        {/* <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="My $SEL" key="1"></Tabs.TabPane>
        </Tabs> */}
        <div className="sel-tab-sections">
          <ul className="sel-tabs ">
            <li className="active">Portfolio</li>
            <li>NFT</li>
            <li>History</li>
            <li>Identity</li>
          </ul>
        </div>
      </Card>

      <div className="profile-desc">
        <Card style={{ borderRadius: "8px" }}>
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
        </Card>
      </div>
    </div>
  );
}
