import { Link } from "react-router-dom";
import { Button } from "antd";

export default function ButtonConnect() {
  return (
    <center className="btn__connectContainer">
      <Link to="/connect">
        {/* <Button shape="circle" className="btn__connect">
          <img
            src="/icons/bulk/wallet-3.svg"
            alt="money-recive.svg"
            height="30px"
            style={{margin: '0'}}
          />
        </Button> */}
        <div className="home-connect-evm">
          <div>
            <img
              src="/icons/bulk/wallet-1.svg"
              alt="money-recive.svg"
              height="30px"
              style={{ margin: "0" }}
            />
          </div>
          <p>Connect EVM</p>
        </div>
      </Link>
    </center>
  );
}
