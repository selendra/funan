import { Alert } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSubstrateState } from '../../context/SubstrateContext';
import { useFetchBalanceSEL } from '../../hooks/useFetchBalanceSEL';

export default function ErrorHandling(props) {
  const { form, ledger } = props;
  const { api } = useSubstrateState();
  const [controllerBalance] = useFetchBalanceSEL(form.controller, 'Selendra', api);
  const [warning, setWarning] = useState(null);
  const [error, setError] = useState(null);
  const [bondError, setBondError] = useState(null);

  useEffect(() => {
    if(form.stash === form.controller) 
      setWarning('Distinct stash and controller accounts are recommended to ensure fund security. You will be allowed to make the transaction, but take care to not tie up all funds, only use a portion of the available funds during this period.');
    else if(ledger !== null)
      setError(`A controller account should not be set to manage multiple stashes. The selected controller is already controlling ${ledger?.stash}.`)
    else if(controllerBalance.freeBalance === 0)
     setError('The controller does not have sufficient funds available to cover transaction fees. Ensure that a funded controller is used.')
    else {
      setWarning(null)
      setError(null)
    };
  },[form, ledger, controllerBalance]);

  return (
    <div>
      { error &&
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      }
      { warning &&
        <Alert 
          message="Warning"
          description={warning}
          type="warning"
          showIcon
        />
      }
    </div>
  )
}