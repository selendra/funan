import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import LayoutComponent from '../../components/Layout';
import WalletMenu from '../../components/WalletMenu';

export default function Send() {
  const activeSubstrateAccount = localStorage.getItem('park-substrate-active-account');
  const [loading, setLoading] = useState(false);

  async function handleTransfer(val) {
    try {
      setLoading(true);
      const SENDER = JSON.parse(activeSubstrateAccount).value;
      // finds an injector for an address
      const injector = await web3FromAddress(SENDER);

      const provider = new WsProvider('wss://rpc1-testnet.selendra.org');
      const api = await ApiPromise.create({ provider });

      // eslint-disable-next-line no-undef
      const parsedAmount = BigInt(val.amount * Math.pow(10, 18));

      await api.tx.balances
        .transfer(val.destination, parsedAmount.toString())
        .signAndSend(
          SENDER, 
          { signer: injector.signer }, 
          (status) => { console.log(status) }
        );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <LayoutComponent>
      <WalletMenu>
        <Form
          layout="vertical"
          size="large"
          onFinish={handleTransfer}
        >
          <Form.Item label="Destination" name="destination">
            <Input className="buy__input" />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <Input className="buy__input" />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} htmlType='submit' className="buy__button">Transfer</Button>
          </Form.Item>
        </Form>
      </WalletMenu>
    </LayoutComponent>
  )
}
