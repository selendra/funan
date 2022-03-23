import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import { Button, Card, Form, Input, message, Spin, Select, Row, Col, Modal } from "antd";
import { Signer } from "../utils/getSigner";
import { Contract } from "../utils/useContract";
import { Allowance } from "../utils/getAllowance";
import { appendSpreadsheet } from "../utils/appendSheet";
import { isvalidSubstrateAddress, ErrorHandling } from "../utils";
import { AccountContext } from "../context/AccountContext";
import { TokenContext } from "../context/TokenContext";
import SelectToken from '../components/SelectToken';
import down from "../assets/icons/down.svg";
import abi from '../abis/token-sale.json';

export default function Buy() {
  const { isTrust, substrateAccount, connectSubstrate, errorExtension } = useContext(AccountContext);
  const { selectedToken } = useContext(TokenContext);
  const [spinning, setSpinning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [modal, setModal] = useState(false);
  const [allowance, setAllowance] = useState("");
  const [estimatedReturn, setEstimatedReturn] = useState("");
  const bnb = "0x0000000000000000000000000000000000000000";
  
  async function approve() {
    try {
      const contractAddress = "0xD31013C0A6690eEA6C3D711034980bda699c7276";
      let abi = [
        "function approve(address _spender, uint256 _value) public returns (bool success)",
      ];

      setLoading(true);
      const signer = await Signer(isTrust);
      const contract = new ethers.Contract(selectedToken, abi, signer);
      const data = await contract.approve(
        contractAddress,
        ethers.utils.parseUnits(Math.pow(10, 18).toString(), 18)
      );
      await data.wait();
      setAllowance(data.hash);
      setLoading(false);
      message.success("Approve completed!");
    } catch (error) {
      ErrorHandling(error);
      setLoading(false);
    }
  }

  async function handleOrder() {
    try {
      if (!amount || !address) return message.error("Please fill the form!");
      if (!isvalidSubstrateAddress(address)) return message.error("selendra address is not valid!");
      setLoading(true);

      let data;
      const contract = await Contract(isTrust);

      if(selectedToken === bnb) {
        data = await contract.order(
          address,
          { 
            value: ethers.utils.parseUnits(amount, 18) 
          }
        );
      }
      if(selectedToken !== bnb) {
        data = await contract.orderToken(
          selectedToken,
          ethers.utils.parseUnits(amount, 18), 
          address
        );
      }
      // console.log(data);
      await data.wait();

      const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
      const result = await provider.getTransactionReceipt(data.hash);
      // console.log(result);
      if (result.status === 1) {
        const ws = new WsProvider("wss://rpc1-testnet.selendra.org");
        const api = await ApiPromise.create({ provider: ws });

        const keyring = new Keyring({
          type: "sr25519",
          ss58Format: 972,
        });
        const account = keyring.addFromMnemonic(process.env.REACT_APP_MNEMONIC);

        // eslint-disable-next-line no-undef
        const parsedAmount = BigInt(estimatedReturn * Math.pow(10, 18));
        const nonce = await api.rpc.system.accountNextIndex(account.address);

        const transfer = await api.tx.balances
          .transfer(address, parsedAmount.toString())
          .signAndSend(account, { nonce });
        console.log(
          `Transfer sent to ${address} with hash ${transfer.toHex()}`,
          "\n"
        );
        const amountSEL = estimatedReturn;
        await appendSpreadsheet(
          address,
          amount,
          amountSEL,
          data.hash,
          result.status
        );
      }
      setLoading(false);
      message.success("Transaction completed!");
    } catch (error) {
      ErrorHandling(error);
      console.log(error);
      setLoading(false);
    }
  }

  async function estimateSEL() {
    try {
      setSpinning(true);
      const contractAddress = '0xD31013C0A6690eEA6C3D711034980bda699c7276';
      const provider = ethers.getDefaultProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
      
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        provider
      );
      const data = await contract.estimateReturn(
        selectedToken, 
        ethers.utils.parseUnits(amount, '18')
      );
      // console.log(data.selendraAmount);
      setEstimatedReturn(ethers.utils.formatUnits(data.selendraAmount, 18));
      setSpinning(false);
    } catch (error) {
      console.log(error);
      setSpinning(false);
    }
  }

  useEffect(() => {
    async function checkAllowance() {
      try {
        if(selectedToken === bnb) return setAllowance(1);
        setLoading(true);
        const allowance = await Allowance(isTrust, selectedToken);
        setAllowance(Number(allowance._hex));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // console.log(error);
      }
    }
    checkAllowance();
  }, [isTrust, allowance, selectedToken]);

  function connectSelendra() {
    connectSubstrate();
    setModal(errorExtension); 
  }

  function onChangeHandler (val) {
    setAddress(val);
  }

  useEffect(() => {
    if(!amount) return;
    estimateSEL();
  }, [amount, selectedToken]);

  
  return (
    <div>
      <Modal
        visible={modal}
        onCancel={() => setModal(false)}
        footer=''
      >
        <p>Please install Selendra Extension. <a href="" target='_blank'>Download</a></p>
      </Modal>
      <Card style={{ borderRadius: "12px" }}>
        <div className="buy__padding">
          <center className="buy__title">
            <h2>Selendra Native Token Sale</h2>
            <p>
              Selendra community auction program is open for anyone to buy SEL
              token up to USD 100.00 and limited time bound.
            </p>
          </center>
          <Form layout="vertical" className="buy__form">
            <Form.Item label="Amount">
              <Input
                className="buy__input"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                suffix={
                  <SelectToken />
                }
              />
            </Form.Item>
            <Form.Item label="Selendra Address">
              <Row gutter={[8, 8]} align='middle'>
                <Col span={substrateAccount.length ? 24 : 12}>
                  <Select
                    className="buy__inputSelect"
                    // placeholder="Enter Selendra Address"
                    options={substrateAccount} 
                    onChange={onChangeHandler}
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col span={substrateAccount.length ? 0 : 12}>
                  <Button className="buy__btnConnect" onClick={connectSelendra}>Connect Selendra</Button>
                </Col>
              </Row>
            </Form.Item>

            {amount && (
              <div>
                <center style={{ marginBottom: "20px" }}>
                  <img src={down} width={22} height={22} alt="" />
                </center>
                <Spin spinning={spinning} delay={500}>
                  <Form.Item label="To (estimated)">
                    <Input
                      className="buy__input"
                      value={(estimatedReturn)}
                      readOnly
                      placeholder=""
                    />
                  </Form.Item>
                </Spin>
              </div>
            )}
            <Form.Item>
              {allowance ? (
                <Button
                  className="buy__button"
                  loading={loading}
                  onClick={handleOrder}
                >
                  Contribute
                </Button>
              ) : (
                <Button
                  className="buy__button"
                  loading={loading}
                  onClick={approve}
                >
                  Approve Spend
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Card>

      <div className="how-it-works-section">
        <div className="buy__padding">
          <h2 className="how-it-works">How it works?</h2>
          {/* <i class="ri-arrow-down-s-line"></i> */}
          <p>
            A simple method for participation to participate in token sale.
            Please follow the steps below: <br />
          </p>
          <ol>
            <li>
              <div>
                Make sure you have Selendra address. Currently, you can set up
                account and get your address via{" "}
                <a
                  href="https://app.selendra.org/#/accounts"
                  target="_blank"
                  rel="noreferrer"
                >
                  Selendra App
                </a>{" "}
              </div>
            </li>
            <li>
              <div>Connect to Metamask or Trust Wallet.</div>
            </li>
            <li>
              <div>
                Change network to BSC, if don't have BSC yet:
                <a
                  href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  Metamask
                </a>
                ,
                <a
                  href="https://academy.binance.com/en/articles/connecting-trust-wallet-to-binance-smart-chain-bsc"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  Trust wallet
                </a>
              </div>
            </li>
            <li>
              <div>
                Make sure you have fund available at least $10 worth of USDT
                stable coins.
              </div>
            </li>
            <li>
              <div>Enter the contribution amount.</div>
            </li>
            <li>
              <div>Press Contribute</div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
