import keyring from '@polkadot/ui-keyring';
import { useEffect, useState } from 'react';
import { useIsMountedRef } from './useIsMountedRef';

const EMPTY = {
  allAccounts: [], 
  areAccountsLoaded: false, 
  hasAccounts: false
}

export function useAccounts() {
  const mountedRef = useIsMountedRef();
  const [state, setState] = useState(EMPTY);

  useEffect(() => {
    const subscription = keyring.accounts.subject.subscribe(
    (accounts = {}) => {
      mountedRef.current &&
      setState({ 
        allAccounts: Object.keys(accounts),
        areAccountsLoaded: true, 
        hasAccounts: true
      });
    });

    return () => {
      setTimeout(() => subscription.unsubscribe(), 0);
    };
  },[mountedRef]);

  return state;
}