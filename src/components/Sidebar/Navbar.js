import { useTheme } from 'next-themes'
import { Row, Layout, Col } from 'antd'
import MenuList from './MenuList'
import ExtensionAlert from './ExtensionAlert'
import logo from 'assets/bitriel.png'
import logoWhite from 'assets/bitriel.png'

export default function Navbar() {
  const { theme } = useTheme()

  return (
    <Layout.Sider
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      width={250}
      className="sidebar-sider"
      style={{
        overflow: 'auto',
        height: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Row align="middle" justify="center">
        <Col xs={0} sm={0} md={0} lg={20} xl={20}>
          <img
            src={theme === 'light' ? logo : logoWhite}
            alt=""
            className="sidebar-logo"
          />
        </Col>
      </Row>
      <MenuList />
      <ExtensionAlert />
    </Layout.Sider>
  )
}
