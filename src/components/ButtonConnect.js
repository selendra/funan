import { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Dropdown } from "antd";
import { AccountContext } from "../context/AccountContext";
import { shortenAddress } from "../utils";

export default function ButtonConnect() {
  const { account, disconnect } = useContext(AccountContext);
  const menu = (
    <Menu className="btn-connect-menu">
      <Menu.Item key="0" className="btn-connect-menuItem" onClick={disconnect}>
        <span>Disconnect</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {account ? (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button type="ghost" className="btn__connect">
            <img
              src="/icons/bulk/wallet-3.svg"
              alt="money-recive.svg"
              height="30px"
            />
            {shortenAddress(account)}
          </Button>
        </Dropdown>
      ) : (
        <Button className="btn__connect">
          <Link to="/connect">Connect</Link>
        </Button>
      )}
    </div>
  );
}
