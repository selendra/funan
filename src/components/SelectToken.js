import { useContext, useEffect } from 'react';
import { Select } from 'antd';
import { TokenContext } from '../context/TokenContext';
import bnb from '../assets/tokens/bnb.png';
import busd from '../assets/tokens/busd.png';
import usdt from '../assets/tokens/usdt.png';
import dai from '../assets/tokens/dai.png';
import eth from '../assets/tokens/eth.png';

export default function SelectToken() {
  const supportedTokens = [
    {
      tokenAddress: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee", // BUSD
      priceFeed: "0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa" // BUSD/USD
    },
    {
      tokenAddress: "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867", // DAI
      priceFeed: "0xE4eE17114774713d2De0eC0f035d4F7665fc025D" // DAI/USD
    },
    {
      tokenAddress: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd", // USDT
      priceFeed: "0xEca2605f0BCF2BA5966372C99837b1F182d3D620" // USDT/USD
    },
    {
      tokenAddress: "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378", // ETH
      priceFeed: "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7" // ETH/USD
    }
  ];

  const { setSelectedToken } = useContext(TokenContext);

  async function handleSelectToken(value) {
    if(value === 'bnb') {
      setSelectedToken('0x0000000000000000000000000000000000000000');
    } else {
      setSelectedToken(value);
    }
  }

  useEffect(() => {
    handleSelectToken('bnb');
  }, []);

  return (
    <Select 
      placeholder="Select a token" 
      defaultValue="bnb"
      onChange={handleSelectToken}
      className='select-token'
    >
      <Select.Option value={supportedTokens[3].tokenAddress}>
        <img src={eth} alt='' width='24' />
        <span style={{marginLeft: '10px'}}>ETH</span>
      </Select.Option>
      <Select.Option value="bnb">
        <img src={bnb} alt='' width='24' />
        <span style={{marginLeft: '10px'}}>BNB</span>
      </Select.Option>
      <Select.Option value={supportedTokens[2].tokenAddress}>
        <img src={usdt} alt='' width='24' />
        <span style={{marginLeft: '10px'}}>USDT</span>
      </Select.Option>
      <Select.Option value={supportedTokens[0].tokenAddress}>
        <img src={busd} alt='' width='24' />
        <span style={{marginLeft: '10px'}}>BUSD</span>
      </Select.Option>
      <Select.Option value={supportedTokens[1].tokenAddress}>
        <img src={dai} alt='' width='24' />
        <span style={{marginLeft: '10px'}}>DAI</span>
      </Select.Option>
    </Select>
  )
}
