import { ApiPromise, WsProvider } from "@polkadot/api";
import { useEffect, useMemo, useState } from "react";


export function useFetchBalanceSEL(address, type) {
  const [state, setState] = useState({
    loading: true,
    freeBalance: null,
    error: null
  });

  useEffect(() => {
    let isMounted = true;  // prevent memory leak
    async function getBalance() {
      if(!address || !type) return;
      if(type !== 'Injection') {
        setState({
          loading: false,
          freeBalance: null,
          error: null
        });
        return;
      }
      try {
        const provider = new WsProvider('wss://rpc-mainnet.selendra.org');
        const api = await ApiPromise.create({ provider });
        // Retrieve the initial balance. Since the call has no callback, it is simply a promise
        // that resolves to the current on-chain value
        let { data: { free: FreeBalance }, nonce: previousNonce } = 
          await api.query.system.account(address);
        if(isMounted) {
          setState({
            loading: false,
            freeBalance: FreeBalance.toJSON(),
            error: null
          });
        }
      } catch (error) {
        if(isMounted) {
          setState({
            loading: false,
            freeBalance: null,
            error: error
          });
        }
      }
      return () => (isMounted = false);
    }
    getBalance();
  }, [address, type]);

  return [state];
}