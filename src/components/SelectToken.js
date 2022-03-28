import { Radio, Row } from "antd";
import { useContext, useEffect } from "react";
import { TokenContext } from "../context/TokenContext";
import { tokens } from "../constants/tokenContract";
import bnb from "../assets/tokens/bnb.png";
import busd from "../assets/tokens/busd.png";
import usdt from "../assets/tokens/usdt.png";
import dai from "../assets/tokens/dai.png";
import eth from "../assets/tokens/eth.png";

export default function SelectToken() {
  const { setSelectedToken, selectedToken } = useContext(TokenContext);

  function onTokenChange(e) {
    setSelectedToken(e.target.value);
  }

  useEffect(() => {
    setSelectedToken(tokens[2].tokenAddress);
  }, []);

  return (
    <Radio.Group
      className="auction-radio"
      value={selectedToken}
      onChange={onTokenChange}
    >
      <Radio.Button value={tokens[2].tokenAddress}>
        <Row align="middle" justify="center">
          <img src={usdt} alt="" width={18} height={18} />
          <span style={{ marginLeft: "2px" }}>USDT</span>
        </Row>
      </Radio.Button>
      <Radio.Button value={tokens[0].tokenAddress}>
        <Row align="middle" justify="center">
          <img src={busd} alt="" width={18} height={18} />
          <span style={{ marginLeft: "2px" }}>BUSD</span>
        </Row>
      </Radio.Button>
      <Radio.Button value={tokens[1].tokenAddress}>
        <Row align="middle" justify="center">
          <img src={dai} alt="" width={18} height={18} />
          <span style={{ marginLeft: "2px" }}>DAI</span>
        </Row>
      </Radio.Button>
      <Radio.Button value={tokens[3].tokenAddress}>
        <Row align="middle" justify="center">
          <img src={eth} alt="" width={18} height={18} />
          <span style={{ marginLeft: "2px" }}>ETH</span>
        </Row>
      </Radio.Button>
      <Radio.Button value="0x0000000000000000000000000000000000000000">
        <Row align="middle" justify="center">
          <img src={bnb} alt="" width={18} height={18} />
          <span style={{ marginLeft: "2px" }}>BNB</span>
        </Row>
      </Radio.Button>
    </Radio.Group>

    // <Select
    //   placeholder="Select a token"
    //   defaultValue="bnb"
    //   onChange={handleSelectToken}
    //   className='select-token'
    // >
    //   <Select.Option value={supportedTokens[3].tokenAddress}>
    //     <img src={eth} alt='' width='24' />
    //     <span style={{marginLeft: '10px'}}>ETH</span>
    //   </Select.Option>
    //   <Select.Option value="bnb">
    //     <img src={bnb} alt='' width='24' />
    //     <span style={{marginLeft: '10px'}}>BNB</span>
    //   </Select.Option>
    //   <Select.Option value={supportedTokens[2].tokenAddress}>
    //     <img src={usdt} alt='' width='24' />
    //     <span style={{marginLeft: '10px'}}>USDT</span>
    //   </Select.Option>
    //   <Select.Option value={supportedTokens[0].tokenAddress}>
    //     <img src={busd} alt='' width='24' />
    //     <span style={{marginLeft: '10px'}}>BUSD</span>
    //   </Select.Option>
    //   <Select.Option value={supportedTokens[1].tokenAddress}>
    //     <img src={dai} alt='' width='24' />
    //     <span style={{marginLeft: '10px'}}>DAI</span>
    //   </Select.Option>
    // </Select>
  );
}
