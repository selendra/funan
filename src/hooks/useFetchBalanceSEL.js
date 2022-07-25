import { useEffect, useState } from "react";
import { useSubstrateState } from "../context/SubstrateContext";
import { FormatBalance } from "../utils";
import { useIsMountedRef } from "./useIsMountedRef";

const EMPTY = {
  loading: false,
  freeBalance: null,
  error: null
}

export function useFetchBalanceSEL(address, type, api) {
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState(EMPTY);
  const { decimals } = useSubstrateState();

  useEffect(() => {
    async function getBalance() {
      if(!address || !type || !api) return;
      if(type !== 'Selendra') return;
      try {
        const subscription = await api.query.system.account(address, ({data: { free: FreeBalance }}) => {
          mountedRef.current &&
          setState({
            loading: false,
            freeBalance: FormatBalance(FreeBalance.toString(), decimals),
            error: null
          });
        });

        return () => {
          setTimeout(() => subscription.unsubscribe(), 0);
        };
      } catch (error) {
        mountedRef.current &&
        setState({
          loading: false,
          freeBalance: null,
          error: error
        });
      }
    }
    getBalance();
  }, [address, type, mountedRef, api]);

  return [state];
}