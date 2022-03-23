import { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Dropdown} from "antd";
import { shortenAddress } from "../utils";
import { AccountContext } from "../context/AccountContext";

export default function ButtonConnect() {
  const { account, disconnect } = useContext(AccountContext);
  const menu = (
    <Menu className='btn-connect-menu'>
      <Menu.Item key="0" className='btn-connect-menuItem' onClick={disconnect}>
        <span>Disconnect</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      { account ? 
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type='ghost' className='btn__connect'>
            {shortenAddress(account)}
          </Button>
        </Dropdown>
        :
        <Button className='btn__connect'>
          <Link to='/connect'>Connect</Link>
        </Button>
      }
    </div>
  )
}
