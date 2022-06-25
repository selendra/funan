import { createContext, useContext, useEffect, useState } from "react";
import { useSubstrateState } from "./SubstrateContext";
import { removePercentage } from "../utils";
import { useStaking } from "./StakingContext";

const ValidatorContext = createContext();
const ValidatorProvider = ({children}) => {
  const { api, apiState } = useSubstrateState();
  const { getNominationsStatus } = useStaking();
  const [validators, setValidators] = useState([]);
  const [fetchedValidators, setFetchedValidators] = useState(false);
  const nominations = getNominationsStatus();

  useEffect(() => {
    async function fetchValidators() {
      if(!api || apiState !== 'READY' || fetchedValidators ) return;
      if(!api.query.staking) return;
      try {
        // fetch validator set
        let validators = [];
        const exposures = await api.query.staking.validators.entries();
        exposures.forEach(([_args, _prefs]) => {
          let address = _args.args[0].toHuman();
          let prefs = _prefs.toHuman();
    
          let _commission = removePercentage(prefs.commission);
    
          validators.push({
            address: address,
            prefs: {
              commission: parseFloat(_commission.toFixed(2)),
              blocked: prefs.blocked
            }
          });
        });
    
        setFetchedValidators(true);
        setValidators(validators);
      } catch (error) {
        console.log(error);        
      }
    }
    fetchValidators();
  },[api, apiState, fetchedValidators]);

  async function getValidatorPrefs() {
    if (!nominations || !api || apiState !== 'READY') return [];

    const v = [];
    for (const _v of nominations) {
      v.push(_v.address);
    }

    const prefsAll = await api.query.staking.validators.multi(v);

    const validatorsWithPrefs = [];
    let i = 0;
    for (const _prefs of prefsAll) {
      const prefs = _prefs.toHuman();
      const commission = removePercentage(prefs.commission);

      const _identity = await api.query.identity.identityOf(v[i]);
      const identity = _identity.toHuman();

      validatorsWithPrefs.push({
        address: v[i],
        status: nominations[i].address === v[i] && nominations[i].status,
        identity: identity?.info.display.Raw,
        prefs: {
          commission,
          blocked: prefs.blocked,
        },
      });
      i++;
    }
    // console.log(validatorsWithPrefs)
    return validatorsWithPrefs;
  }

  return (
    <ValidatorContext.Provider
      value={{
        validators,
        getValidatorPrefs
      }}
    >
      {children}
    </ValidatorContext.Provider>
  )
}

const useValidator = () => useContext(ValidatorContext);
export { ValidatorProvider, useValidator };