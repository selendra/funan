import { Layout } from 'antd'
import { useEffect } from 'react'
import Navbar from './Navbar'
import MobileDrawer from './MobileDrawer'

export default function LayoutComponent({ children }) {
  useEffect(() => {
    async function switchChain() {
      try {
        if (!window.ethereum) return
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          // chainId must be in hexadecimal numbers
          params: [{ chainId: '0x61' }],
        })
      } catch (error) {
        console.log('Error on switching network:', error)
      }
    }
    switchChain()
  }, [])

  return (
    <Layout hasSider>
      <Navbar />
      <Layout>
        <MobileDrawer />
        <Layout.Content>
          <div className="wrapper">
            <div className="wrapper-sub-background">
              <div className="container">{children}</div>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
