import { useEffect, useState } from "react";

export function useFetchBalanceSEL(address, type, api) {
  const [state, setState] = useState({
    loading: true,
    freeBalance: null,
    error: null
  });

  useEffect(() => {
    let isMounted = true;  // prevent memory leak
    async function getBalance() {
      if(!address || !type) return;
      if(type !== 'Selendra') {
        setState({
          loading: false,
          freeBalance: null,
          error: null
        });
        return;
      }
      try {
        let { data: { free: FreeBalance } } = await api.query.system.account(address);
        
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