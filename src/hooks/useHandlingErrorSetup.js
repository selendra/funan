import { useState, useEffect } from 'react';
import { useStaking } from 'context/StakingContext';
import { useSubstrateState } from 'context/SubstrateContext';
import { useFetchBalanceSEL } from './useFetchBalanceSEL';

export const useHandlingErrorSetup = (props) => {
  const { form, ledger } = props;

  const { api } = useSubstrateState();
  const { staking, getBondOptions } = useStaking();
  const { freeToBond } = getBondOptions();
  // console.log(freeToBond)

  const [controllerBalance] = useFetchBalanceSEL(form?.controller, 'Selendra', api);
  const [warning, setWarning] = useState('');
  const [error, setError] = useState('');
  const [bondError, setBondError] = useState('');

  useEffect(() => {
    if(!form || !staking) return;
    setError('');
    setWarning('');
    setBondError('');
    if(form.stash === form.controller) 
      setWarning('Distinct stash and controller accounts are recommended to ensure fund security. You will be allowed to make the transaction, but take care to not tie up all funds, only use a portion of the available funds during this period.');
    else if(ledger !== null)
      setError(`A controller account should not be set to manage multiple stashes. The selected controller is already controlling ${ledger?.stash}.`)
    else if(controllerBalance.freeBalance === 0)
      setError('The controller does not have sufficient funds available to cover transaction fees. Ensure that a funded controller is used.')
    else if(form.bond > freeToBond) 
      setBondError('Bond amount is more than your free balance.')
    else if(form.bond < staking.minNominatorBond) {
      setBondError(`The bonded amount is less than the minimum bond amount of ${staking.minNominatorBond}`)
    }
    else {
      setWarning('');
      setError('');
      setBondError('');
    };
  },[form, ledger, controllerBalance, staking]);

  return {
    warning,
    error,
    bondError,
  };
};
