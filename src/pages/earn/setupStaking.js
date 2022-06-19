import { useState } from 'react';
import { useSubstrateState } from '../../context/SubstrateContext';
import Summary from '../../components/Staking/setup/Summary';
import SelectNominator from '../../components/Staking/setup/SelectNominator';
import InputBondAmount from '../../components/Staking/setup/InputBondAmount';
import SelectController from '../../components/Staking/setup/SelectController';
import SelectRewardDestination from '../../components/Staking/setup/SelectRewardDestination';

const options = [
  {
    title: 'Back to Staking',
    subtitle: 'Payouts are automatically bonded to your existing bonded balance.',
    value: 'Staked',
  }, {
    title: 'To Stash',
    subtitle: 'Payouts will be sent to your stash account as free balance.',
    value: 'Stash',
  }, {
    title: 'To Controller',
    subtitle: 'Payouts will be sent to your controller account as free balance.',
    value: 'Controller',
  },
];

export default function SetupStaking() {
  const { api, currentAccount } = useSubstrateState();
  const [stage, setStage] = useState(0);
  const [nominate, setNominate] = useState([]);
  const [form, setForm] = useState({
    stash: currentAccount.address,
    controller: null,
    payee: null,
    bond: null,
  });

  return (
    <div>
      <SelectController 
        form={form}
        setForm={setForm}
        nominate={nominate}
      />
      <br/>
      <SelectRewardDestination 
        form={form}
        setForm={setForm}
        nominate={nominate}
        options={options}
      />
      <br/>
      <SelectNominator 
        nominate={nominate}
        setNominate={setNominate}
      />
      <br/>
      <InputBondAmount 
        form={form}
        setForm={setForm}
        nominate={nominate}
      />
      <br/>
      <Summary 
        form={form}
        nominate={nominate}
        api={api}
      />
    </div>
  )
}
