import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Col, Drawer, Row } from 'antd'
import MenuList from './MenuList'
import logo from 'assets/logo.png'
import logoWhite from 'assets/logo-white.png'
import menu from 'assets/menu.svg'
import menuWhite from 'assets/menu-white.svg'
import { Link } from 'react-router-dom'

export default function MobileDrawer() {
  const { theme } = useTheme();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Row justify='space-between' className='mobile-drawer-header'>
        <Col xs={12} sm={12} md={0} lg={0} xl={0}>
          <Link to='/home'>
            <img 
              alt=''
              src={
                theme === 'light' ? 
                logo : logoWhite
              }
              height={40}
            />
          </Link>
        </Col>
        <Col xs={2} sm={2} md={0} lg={0} xl={0}>
          <img 
            alt=''
            src={
              theme === 'light' ? 
              menu : menuWhite
            }
            width={32}
            height={32}
            onClick={showDrawer}
          />
        </Col>
      </Row>
      <Drawer
        width="280"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={
          theme === "light" ? 
          { background: 'rgba(255, 255, 255, 0.822)' } 
          : 
          { background: '#2d333b' }
        }
      >
        <div style={{padding: '24px'}}>
          <img
            src={theme === "light" ? logo : logoWhite}
            alt="selendra-logo"
            width="50%"
          />
        </div>
        <MenuList />
      </Drawer>
    </div>
  )
}
