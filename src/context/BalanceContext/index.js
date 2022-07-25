import { 
  createContext, 
  useContext, 
  useEffect, 
  useState 
} from "react";
import { useSubstrateState } from '../SubstrateContext';
import { useIsMountedRef } from "hooks/useIsMountedRef";
import { EMPTY_BALANCE, EMPTY_LEDGER } from "./default";
import { formatBN } from "utils";

const BalanceContext = createContext();
const BalanceProvider = ({children}) => {
  const mountedRef = useIsMountedRef();
  const { 
    api, 
    apiState, 
    consts,
    currentAccount,
    decimals
  } = useSubstrateState();

  // balance accounts state
  const [balance, setBalance] = useState(EMPTY_BALANCE);
  // bonded controller accounts derived from getBalances
  const [bondedAccounts, setBondedAccounts] = useState();
  // account nominations
  const [nominations, setNomination] = useState(null);
  // account ledgers to separate storage
  const [ledgers, setLedgers] = useState(EMPTY_LEDGER);
  // console.log(ledgers);

  // existential amount of unit for an account
  const _existentialAmount = consts?.existentialDeposit;
  const existentialAmount = formatBN(_existentialAmount.toString(), decimals);

  // amount of compulsary reserve balance
  const reserveAmount = existentialAmount / 2;

  // minimum reserve for submitting extrinsics
  const minReserve = reserveAmount + existentialAmount;
  
  // calculate free balance after app reserve
  let freeAfterReserve = (balance.free) - (minReserve);
  freeAfterReserve = freeAfterReserve < 0 ? 0 : freeAfterReserve;

  useEffect(() => {
    if(!api || apiState !== 'READY' || !currentAccount) return;
    async function subscribeToBalances() {
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
              free: formatBN(free.toString(), decimals),
              reserved: formatBN(reserved.toString(), decimals),
              miscFrozen: formatBN(miscFrozen.toString(), decimals),
              feeFrozen: formatBN(feeFrozen.toString(), decimals),
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
    async function subscribeToLedger() {
      try {
        const subscription = await api.query.staking.ledger(bondedAccounts, (_ledger) => {
          if(_ledger.toJSON() === null) return;
          const { stash, total, active, unlocking } = _ledger.toJSON();
          mountedRef && setLedgers({
            stash: stash,
            total: formatBN(total.toString(), decimals),
            active: formatBN(active.toString(), decimals),
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
    subscribeToBalances();
    subscribeToLedger();
  }, [apiState, api, bondedAccounts, currentAccount, mountedRef, decimals, freeAfterReserve]);

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