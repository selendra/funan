import { Button } from 'antd';
import icon from '../assets/icon-white.png';

export default function ButtonConnectSubstrate() {
  return (
    <center className="btn__connectContainer">
      <Button shape="circle" className="btn__connectSelendra">
        <img
          src={icon}
          alt="money-recive.svg"
          height="30px"
          style={{margin: '0'}}
        />
      </Button>
      <p>Connect Selendra</p>
    </center>
  )
}
