import { 
  Menu, 
  Button, 
  Dropdown, 
} from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../context/AccountContext";



export default function ButtonConnect() {
  const { account, disconnect } = useContext(AccountContext);

  function strSlice(str) {
    return str.slice(0, 4) + '...' + str.slice(-3);
  }; 

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
            {strSlice(account)}
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