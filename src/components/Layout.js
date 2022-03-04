import { 
  Row,
  Menu, 
  Input,
  Layout,
} from 'antd';
import { 
  Link,
  useLocation 
} from 'react-router-dom';
import Icon from '@ant-design/icons';
import logo from '../assets/logo.png';
import { ReactComponent as User } from '../assets/icons/user.svg';
import { ReactComponent as Card } from '../assets/icons/cards.svg';
import { ReactComponent as Trade } from '../assets/icons/trade.svg';
import { ReactComponent as Borrow } from '../assets/icons/money-recive.svg';
import { ReactComponent as Stake } from '../assets/icons/3dcube.svg';
import ButtonConnect from './ButtonConnect';

const UserIcon = props => <Icon component={User} {...props}/>
const CardIcon = props => <Icon component={Card} {...props}/>
const TradeIcon = props => <Icon component={Trade} {...props}/>
const BorrowIcon = props => <Icon component={Borrow} {...props}/>
const StakeIcon = props => <Icon component={Stake} {...props}/>

export default function LayoutComponent({ children }) {
  const location = useLocation();

  return (
    <Layout>
      <Layout.Sider
        collapsible 
        trigger={null} 
        theme='light'
      >
        <Row align='middle' justify='center'>
          <img src={logo} alt='' className="layout__logo" />
        </Row>
        <Menu className='layout__menu' theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key="/profile" icon={<UserIcon />}>
            Profile
            <Link to='/profile' />
          </Menu.Item>
          <Menu.Item key="/buy" icon={<CardIcon />}>
            Buy
            <Link to='/buy' />
          </Menu.Item>
          <Menu.Item key="3" icon={<TradeIcon />}>
            Exchange
            <Link to='/exchange' />
          </Menu.Item>
          <Menu.Item key="4" icon={<BorrowIcon />}>
            Borrow
            <Link to='/borrow' />
          </Menu.Item>
          <Menu.Item key="5" icon={<StakeIcon />}>
            Stake/Earn
            <Link to='/stake' />
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header style={{ padding: '0 40pt', background: '#FFF' }}>
          <Row justify='space-between' align='middle' style={{ height: '100%' }}>
            <Input 
              placeholder='Search by address' 
              className='layout__search' 
            />
            <ButtonConnect />
          </Row>
        </Layout.Header>
        <Layout.Content
          style={{
            margin: '40pt',
            minHeight: '85vh',
          }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}