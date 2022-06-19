import { createContext, useContext, useEffect, useState } from "react";
import { useSubstrateState } from './SubstrateContext';
import { useIsMountedRef } from "../hooks/useIsMountedRef";
import { formatBN } from "../utils";

const EMPTY_BALANCE = {
  free: 0,
  reserved: 0,
  miscFrozen: 0,
  feeFrozen: 0,
  freeAfterReserve: 0
}
const EMPTY_LEDGER = {
  stash: '',
  total: '',
  active: '',
  unlocking: ''
}

const BalanceContext = createContext();
const BalanceProvider = ({children}) => {
  const mountedRef = useIsMountedRef();
  const { 
    api, 
    apiState, 
    consts,
    currentAccount
  } = useSubstrateState();
  // balance accounts state
  const [balance, setBalance] = useState(EMPTY_BALANCE);
  // bonded controller accounts derived from getBalances
  const [bondedAccounts, setBondedAccounts] = useState();
  // account nominations
  const [nominations, setNomination] = useState(null);
  // account ledgers to separate storage
  const [ledgers, setLedgers] = useState(EMPTY_LEDGER);

  // existential amount of unit for an account
  const _existentialAmount = consts?.existentialDeposit;
  const existentialAmount = formatBN(_existentialAmount.toString());

  // amount of compulsary reserve balance
  const reserveAmount = existentialAmount / 2;

  // minimum reserve for submitting extrinsics
  const minReserve = reserveAmount + existentialAmount;
  
  // calculate free balance after app reserve
  let freeAfterReserve = (balance.free) - (minReserve);
  freeAfterReserve = freeAfterReserve < 0 ? 0 : freeAfterReserve;

  useEffect(() => {
    async function subscribeToLedger() {
      if(!api || apiState !== 'READY' || !currentAccount) return;
      try {
        const { address } = currentAccount;
        const subscription = await api.query.staking.ledger(address, (_ledger) => {
          if(_ledger.toJSON() === null) return;
          const { stash, total, active, unlocking } = _ledger.toJSON();
          mountedRef && setLedgers({
            stash: stash,
            total: formatBN(total.toString()),
            active: formatBN(active.toString()),
            unlocking: unlocking
          })
        });
        return () => {
          setTimeout(() => subscription.unsubscribe(), 0);
        };
      } catch (error) {
        console.log(error);
      }
    }
    subscribeToLedger();
  }, [api, apiState, currentAccount, mountedRef]);

  useEffect(() => {
    async function subscribeToBalances() {
      if(!api || apiState !== 'READY' || !currentAccount) return;
      try {
        const { address } = currentAccount;
        const subscription = await api.queryMulti([
          [api.query.system.account, address],
          [api.query.staking.bonded, address],
          [api.query.staking.nominators, address],
        ], ([{data}, _bonded, _nominators]) => {
          const { free, reserved, miscFrozen, feeFrozen } = data;
          mountedRef && 
            setBalance({
              free: formatBN(free.toString()),
              reserved: formatBN(reserved.toString()),
              miscFrozen: formatBN(miscFrozen.toString()),
              feeFrozen: formatBN(feeFrozen.toString()),
              freeAfterReserve
            })
            setBondedAccounts(_bonded.toJSON());
            setNomination(_nominators.toJSON());
        })
        return () => {
          setTimeout(() => subscription.unsubscribe(), 0);
        };
      } catch (error) {
        console.log(error);
      }
    }
    subscribeToBalances();
  }, [api, apiState, currentAccount, freeAfterReserve, mountedRef]);

  return (
    <BalanceContext.Provider
      value={{
        balance,
        bondedAccounts,
        ledgers,
        nominations,
      }}
    >{children}</BalanceContext.Provider>
  )
}

const useBalance = () => useContext(BalanceContext);
export { useBalance, BalanceProvider };