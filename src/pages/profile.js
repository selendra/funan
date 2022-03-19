import { useContext, useEffect, useState } from "react";
import { Avatar, Card, Col, Row, Spin, Tabs } from "antd";
import { AccountContext } from "../context/AccountContext";
import { ethers } from "ethers";
import abi from "../abis/token-sale.json";
import sel from "../assets/sel-token.png";

export default function Profile() {
  const { account } = useContext(AccountContext);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("");

  async function getBalance() {
    setLoading(true);
    const contractAddress = "0x1ea5d1c9434B89B03C4aAC95dd4C56cD86430385";
    const provider = ethers.getDefaultProvider(
      "https://data-seed-prebsc-1-s1.binance.org:8545"
    );

    const contract = new ethers.Contract(contractAddress, abi, provider);

    const data = await contract.balanceOf(account);
    setBalance(ethers.utils.formatUnits(data._hex, 18));
    setLoading(false);
  }

  function getPrice(amount) {
    return (Number(amount) * 0.03).toFixed(2);
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
            <li className="active">My $Sel</li>
            <li>NFT</li>
            <li>History</li>
            <li>Identity</li>
          </ul>
        </div>
      </Card>

      <div className="profile-desc">
        <Card style={{ borderRadius: "8px" }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Row gutter={[8, 8]} align="middle">
                <Col>
                  <img src={sel} alt="" width="44" height="44" />
                </Col>
                <Col>
                  <div className="profile__selPrice">
                    <p>SEL</p>
                    <p>$ 0.03</p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <Spin spinning={loading} />
              {!loading && (
                <div className="profile__estimateValue">
                  <p>{Number(balance).toFixed(2)} SEL</p>
                  <p>≈ ${getPrice(balance)} USD</p>
                </div>
              )}
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}
