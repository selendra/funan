import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import Icon from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, message, Radio, Row, Spin, Tabs } from "antd";
import { AccountContext } from "../context/AccountContext";
import { tokens } from "../constants/tokenContract";
import TokenBalance from "../components/TokenBalance";
import sel from "../assets/tokens/sel.png";
import bnb from '../assets/tokens/bnb.png';
import busd from '../assets/tokens/busd.png';
import usdt from '../assets/tokens/usdt.png';
import dai from '../assets/tokens/dai.png';
import eth from '../assets/tokens/eth.png';
import ButtonConnect from "../components/ButtonConnect";
import ButtonConnectSubstrate from "../components/ButtonConnectSubstrate";
import { shortenAddress } from "../utils";
import { ReactComponent as Edit } from '../../public/icons/bulk/edit-2.svg';
import { ReactComponent as Copy } from '../../public/icons/bulk/copy.svg';
import Wallet from "../components/Wallet";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const EditIcon = props => <Icon component={Edit} {...props} />;
const CopyIcon = props => <Icon component={Copy} {...props} />;


export default function Profile() {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(false);
  const { account, substrateAccount } = useContext(AccountContext);

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
      <p className="profile-home">Home</p>
      <Card style={{ borderRadius: "8px" }} className="sel-card">
        <Row gutter={[8, 8]} align="middle" justify="space-between">
          <Col span={6}>
            <Row gutter={[32, 32]}> 
              <Col>
                <ButtonConnect />
              </Col>
              <Col>
                <ButtonConnectSubstrate />
              </Col>
            </Row>
          </Col>
          <Divider type="vertical" style={{height: '7em', borderLeft: '2px solid rgba(0,0,0,.07)'}} />
          <Col span={14}>
            <Row gutter={[16, 16]} align='middle' justify="space-evently">
              <Col span={6}>
                <Avatar
                  src={`https://avatars.dicebear.com/api/identicon/${substrateAccount.length > 0 && substrateAccount[0].label}.svg`}
                  size={64}
                />
              </Col>
              <Col span={14}>
                { substrateAccount.length !== 0 &&
                  <div>
                    <p>{shortenAddress(substrateAccount[0]?.label)}</p>
                    <Row gutter={[8,8]}>
                      <Button type="link" icon={<EditIcon />} style={{paddingLeft: '0'}}>Change</Button>
                      <CopyToClipboard text={substrateAccount[0].label}>
                        <Button type="link" icon={<CopyIcon />} style={{paddingLeft: '0'}} onClick={() => message.success('Copied')}>
                          Copy
                        </Button>
                      </CopyToClipboard>
                    </Row>
                  </div>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <p className="profile-home">Wallet</p>
      <div>
        <Wallet account={account} type='Metamask' />
        { substrateAccount.length > 0 && 
          substrateAccount.map((account, key) => 
            <Wallet key={key} account={account.label} type='Injection' />
          )
        }
      </div>

      <p className="profile-home">Portfolio</p>
      <div className="profile-desc">
        <Card style={{ borderRadius: "8px" }}>
          { account && 
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
          }
        </Card>
      </div>
    </div>
  );
}
