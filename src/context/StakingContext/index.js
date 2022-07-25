import moment from 'moment';
import { createContext, useContext, useEffect, useState } from "react";
import { useSubstrateState } from "../SubstrateContext";
import { useIsMountedRef } from "../../hooks/useIsMountedRef";
import { useBalance } from '../BalanceContext';
import { BigNumber } from 'bignumber.js';
import { EMPTY_SESSION_ERA, EMPTY_BONDOPTIONS } from './default';

const StakingContext = createContext();
const StakingProvider = ({children}) => {
  const mountedRef = useIsMountedRef();
  const { nominations, ledgers, balance } = useBalance();
  const { api, apiState, currentAccount, consts, decimals } = useSubstrateState();
  const [staking, setStaking] = useState(null);
  const [eraStakers, setEraStakers] = useState([]);

  const [sessionEra, setSessionEra] = useState(EMPTY_SESSION_ERA);

  useEffect(() => {
    async function fetchEraStakers() {
      if(!api || apiState !== 'READY' || !staking) return;
      const _exposures = 
        await api.query.staking.erasStakers.entries(
          staking.activeEra.index
        );
      const __exposures = 
        _exposures.map(([_keys, _val]) => ({
          keys: _keys.toHuman(),
          val: _val.toHuman(),
        }));
  
      let stakers = [];
      __exposures.map(({keys, val}) => {
        const address = keys[1];
        stakers.push({
          address,
          ...val,
        });
        return stakers;
      })
      setEraStakers(stakers);
    }
    async function getEraSession() {
      if(apiState !== 'READY' || !api) return;
      try {
        const subscription = await api.derive.session.progress((session) => {
          const _state = {
            eraLength: session.eraLength.toNumber(),
            eraProgress: session.eraProgress.toNumber()
          };
          mountedRef.current &&
          setSessionEra(_state);
        });
        return () => {
          setTimeout(() => subscription.unsubscribe(), 0);
        };
      } catch (error) {
        console.log(error);          
      }
    }
    getEraSession();
    fetchEraStakers();
  },[api, apiState, mountedRef, staking])

  useEffect(() => {
    async function subscribeToStakingkMetrics() {
      if(!api || apiState !== 'READY' || !currentAccount) return;
      try {
        const subscription = await api.queryMulti([
          api.query.staking.activeEra,
          api.query.staking.minNominatorBond,
          [api.query.staking.payee, currentAccount.address],
          api.query.staking.historyDepth,
        ], ([
          _activeEra,
          _minNominatorBond,
          _payee,
          _historyDepth
        ]) => {
          // console.log(_historyDepth.toJSON());
          mountedRef.current &&
          setStaking({
            activeEra: _activeEra.toJSON(),
            minNominatorBond: new BigNumber(_minNominatorBond).toNumber(),
            payee: _payee.toHuman(),
            historyDepth: _historyDepth.toJSON()
          })
        })
        return () => {
          setTimeout(() => subscription.unsubscribe(), 0);
        };
      } catch(error) {
        console.log(error)
      }
    }
    subscribeToStakingkMetrics();
  }, [api, apiState, currentAccount, mountedRef]);

  function getBondOptions() {
    if(!staking || !ledgers || !balance) return EMPTY_BONDOPTIONS;
    
    // console.log(ledgers)

    let totalUnlockingBn = new BigNumber(0);
    let totalUnlockedBn = new BigNumber(0);

    function toBn(amount) {
      return new BigNumber(amount)
        .dividedBy(Math.pow(10, decimals))
    }
    
    for (const u of ledgers.unlocking) {
      const { value, era } = u;

      if (staking.activeEra.index > era) {
        totalUnlockedBn = totalUnlockedBn.plus(toBn(value));
      } else {
        totalUnlockingBn = totalUnlockingBn.plus(toBn(value));
      }
    }
    // console.log(ledgers.unlocking)
    
    // console.log(totalUnlockingBn.toNumber())
    const totalUnlocking = totalUnlockingBn.toNumber();
    const totalUnlocked = totalUnlockedBn.toNumber();
    const freeToBond = Math.max(
      balance.freeAfterReserve - ledgers.active
    )

    return { 
      freeToBond,
      totalUnlocking,
      totalUnlocked, 
    }
  }

  function getNominationsStatus() {
    if(
      apiState !== 'READY' ||
      !api || 
      !staking || 
      !currentAccount || 
      !nominations ||
      !eraStakers
    ) return [];
    if(!nominations.targets) return [];
    // console.log(eraStakers)
    const statuses = [];
    for (const nomination of nominations.targets) {
      const s = eraStakers.find(
        ({address}) => address === nomination
      );
      // console.log(s)

      if (s === undefined) {
        statuses.push({
          address: nomination,
          status: 'Waiting'
        })
        continue;
      }
      const exists = (s.others ?? []).find(
        (_o) => _o.who === currentAccount.address
      );
      if (exists === undefined) {
        statuses.push({
          address: nomination,
          status: 'Inactive'
        })
        continue;
      }
      statuses.push({
        address: nomination,
        status: 'Active'
      })
    }
    // console.log(statuses);
    return statuses;
  }

  function getEraTimeLeft() {
    const eraBlocksLeft = sessionEra.eraLength - sessionEra.eraProgress;
    const eraTimeLeftSeconds = eraBlocksLeft * (consts.expectedBlockTime * 0.001);
    const eventTime = moment().unix() + eraTimeLeftSeconds;
    const diffTime = eventTime - moment().unix();
    // console.log(eraBlocksLeft)
    return diffTime;
  }

  async function getAccountPayee(address) {
    const payee = await api.query.staking.payee(address);
    return payee.toHuman();
  }

  async function getAccountLedger(address) {
    if(!api) return;
    const ledger = await api.query.staking.ledger(address);
    return ledger.toJSON();
  }

  async function hasController() {
    if(!api || apiState !== 'READY' || !currentAccount) return false;
    const data = await api.query.staking.bonded(currentAccount.address);
    return data.toJSON() !== null;
  }

  async function isBonding() {
    if (!hasController()) {
      return false;
    }
    const ledger = await getAccountLedger(currentAccount.address);
    return ledger?.active > 0;
  }

  function isNominating() {
    if(!nominations) return false;
    return nominations.length > 0;
  };

  // check if current account not staked
  function inSetup() {
    return (
      !currentAccount.address ||
      !hasController() ||
      !isBonding() ||
      !isNominating()
    )
  }

  return (
    <StakingContext.Provider
      value={{
        staking,
        sessionEra,
        eraStakers,
        getEraTimeLeft,
        getAccountLedger,
        getAccountPayee,
        getNominationsStatus,
        getBondOptions,
        inSetup
      }}
    >{children}</StakingContext.Provider>
  )
}

const useStaking = () => useContext(StakingContext);
export { StakingProvider, useStaking };