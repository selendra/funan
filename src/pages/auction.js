import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Spin,
  Select,
  Row,
  Col,
  InputNumber,
  Popover,
} from "antd";
import { Signer } from "../utils/getSigner";
import { Contract } from "../utils/useContract";
import { Allowance } from "../utils/getAllowance";
import { appendSpreadsheet } from "../utils/appendSheet";
import { isvalidSubstrateAddress, ErrorHandling, getTokenName } from "../utils";
import { AccountContext } from "../context/AccountContext";
import { TokenContext } from "../context/TokenContext";
import down from "../assets/icons/down.svg";
import abi from "../abis/token-sale.json";
import LayoutComponent from "../components/Layout";
import SelectToken from "../components/SelectToken";

export default function Buy() {
  // === >>>  Context Section <<< ===
  const { isTrust, substrateAccount, connectSubstrate } =
    useContext(AccountContext);
  const { selectedToken } = useContext(TokenContext);

  // === >>> State Section <<< ===
  const [spinning, setSpinning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [convertAmount, setConvertAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [allowance, setAllowance] = useState("");
  const [estimatedReturn, setEstimatedReturn] = useState("");

  // === >>> Varible Section <<< ===
  const bnb = "0x0000000000000000000000000000000000000000";

  // === >>> useEffect Section <<< ===
  useEffect(() => {
    async function checkAllowance() {
      try {
        if (selectedToken === bnb) return setAllowance(1);
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

  useEffect(() => {
    if (!amount) return;
    estimateSEL();
    getPriceUSD();
  }, [amount, selectedToken]);

  // === >>> Function Section <<< ===

  function connectSelendra() {
    connectSubstrate();
    // setModal(errorExtension);
  }

  function onChangeHandler(val) {
    setAddress(val);
  }

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
      if (!isvalidSubstrateAddress(address))
        return message.error("selendra address is not valid!");
      setLoading(true);

      let data;
      const contract = await Contract(isTrust);

      if (selectedToken === bnb) {
        data = await contract.order(address, {
          value: ethers.utils.parseUnits(amount, 18),
        });
      }
      if (selectedToken !== bnb) {
        data = await contract.orderToken(
          selectedToken,
          ethers.utils.parseUnits(amount, 18),
          address
        );
      }
      // console.log(data);
      await data.wait();

      const provider = new ethers.providers.JsonRpcProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545"
      );
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

  // === >>> Estimated SEL <<< ===
  async function estimateSEL() {
    try {
      if (!amount) return;
      setSpinning(true);
      const contractAddress = "0xD31013C0A6690eEA6C3D711034980bda699c7276";
      const provider = ethers.getDefaultProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
      );

      const contract = new ethers.Contract(contractAddress, abi, provider);
      const data = await contract.estimateReturn(
        "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
        ethers.utils.parseUnits(amount, "18")
      );
      // console.log(data.selendraAmount);
      setEstimatedReturn(ethers.utils.formatUnits(data.selendraAmount, 18));
      setSpinning(false);
    } catch (error) {
      console.log(error);
      setSpinning(false);
    }
  }

  // === >>> Checking Amount Input <<< ===
  const checkAmount = (value) => {
    setAmount(`${value}`);
    if (value < 10) {
      return setErrorMsg("The minimum amount is 10!");
    } else if (value > 100) {
      return setErrorMsg("The maximum amount is 100!");
    } else if (value === null) {
      setAmount(0);
    } else {
      setAmount(`${value}`);
      setErrorMsg(null);
    }
  };

  // === >>> Get Amount <<< ===
  async function getPriceUSD() {
    try {
      const contractAddress = "0xD31013C0A6690eEA6C3D711034980bda699c7276";

      const provider = new ethers.providers.JsonRpcProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545"
      );
      const contract = new ethers.Contract(contractAddress, abi, provider);
      let data;
      if (selectedToken === bnb) {
        data = await contract["getPrice()"]();
      } else {
        data = await contract["getPrice(address)"](selectedToken);
      }
      const price = ethers.utils.formatUnits(data._hex, 8);
      setConvertAmount(Number(price));
      // console.log(Number(price));
    } catch (error) {
      console.log(error);
    }
  }

  // === >>> END Function Section <<< ===

  return (
    <LayoutComponent>
      <Card style={{ borderRadius: "12px" }}>
        <div className="buy__padding">
          <center className="buy__title">
            <h2>Selendra Native Token Sale</h2>
            <p>
              Selendra community auction program is open for anyone to buy SEL
              token up to USD 100.00 and limited time bound.
            </p>
          </center>
          <Form
            layout="vertical"
            size="large"
            className="buy__form"
            onFinish={handleOrder}
          >
            <Form.Item label="Amount" required tooltip="Amount is required!">
              <InputNumber
                className="buy__input"
                placeholder="Enter Amount in USD"
                defaultValue={amount}
                onChange={(value) => checkAmount(value)}
                style={{ width: "100%" }}
              />
              <div className="error-text">{errorMsg}</div>
              <Form.Item
                label={`To ${getTokenName(selectedToken)} (estimated)`}
              >
                <Input
                  className="buy__input"
                  value={
                    amount >= 10 ? Number(amount / convertAmount).toFixed(5) : 0
                  }
                  readOnly
                  placeholder=""
                />
              </Form.Item>
              {/* {amount >= 10 && `${amount} USD = ${Number(amount / convertAmount).toFixed(5)}`}{" "}
              <span className="switch-asset">
                {amount >= 10 && (
                  <Popover
                    content={
                      <div>
                        <p>BUSD</p>
                        <p>BNB</p>
                      </div>
                    }
                    title={`Currency: BUSD`}
                  >
                    <b>BUSD</b>
                  </Popover>
                )}
              </span> */}
              <div style={{ marginTop: "8px" }} />
              <SelectToken />
            </Form.Item>
            {substrateAccount.length !== 0 && (
              <Form.Item label="Selendra Address">
                <Row gutter={[8, 8]} align="middle">
                  <Col span={24}>
                    <Select
                      className="buy__inputSelect"
                      placeholder="Enter Selendra Address"
                      options={substrateAccount}
                      onChange={onChangeHandler}
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
              </Form.Item>
            )}

            {amount > 9 ? (
              <Spin spinning={spinning} delay={500}>
                <div>
                  <center style={{ marginBottom: "20px" }}>
                    <img src={down} width={22} height={22} alt="" />
                  </center>
                  <Form.Item label="To (estimated)">
                    <Input
                      className="buy__input"
                      value={estimatedReturn}
                      readOnly
                      placeholder=""
                    />
                  </Form.Item>
                </div>{" "}
              </Spin>
            ) : (
              ""
            )}
            {substrateAccount.length === 0 ? (
              <Button className="buy__button" onClick={connectSelendra}>
                Connect Selendra
              </Button>
            ) : (
              <Form.Item>
                {allowance ? (
                  <Button
                    className="buy__button"
                    htmlType="submit"
                    loading={loading}
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
            )}
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
    </LayoutComponent>
  );
}
