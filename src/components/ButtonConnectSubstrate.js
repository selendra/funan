import { Button } from "antd";

export default function ButtonConnectSubstrate() {
  return (
    <center className="btn__connectContainer">
      {/* <Button shape="circle" className="btn__connect">
        <img
          src={icon}
          alt="money-recive.svg"
          height="30px"
          style={{margin: '0'}}
        />
      </Button>
      <p>Connect Selendra</p> */}
      <div className="home-connect-sel">
        <div>
          <img
            src="/icons/bulk/wallet-add-1-index.svg"
            alt="money-recive.svg"
            height="30px"
            style={{ margin: "0" }}
          />
        </div>
        <p>Connect Selendra</p>
      </div>
    </center>
  );
}
