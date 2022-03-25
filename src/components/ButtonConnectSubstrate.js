import { Button } from 'antd';

export default function ButtonConnectSubstrate() {
  return (
    <center className="btn__connectContainer">
      <Button shape="circle" className="btn__connect">
        <img
          src="/icons/bulk/wallet-3.svg"
          alt="money-recive.svg"
          height="30px"
          style={{margin: '0'}}
        />
      </Button>
      <p>Connect Selendra</p>
    </center>
  )
}
