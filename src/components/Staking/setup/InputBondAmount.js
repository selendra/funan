import { Input, Card } from 'globalComponents';
import { useStaking } from '../../../context/StakingContext';

export default function InputBondAmount({
  form,
  setForm,
  nominate,
  bondError
}) {
  const { getBondOptions } = useStaking();
  const { freeToBond } = getBondOptions();

  return (
    <Card>
      <h2>Bond</h2>
      <h3>Available: {freeToBond} CDM</h3><br/>
      <label>Bond CDM :</label>
      <Input.Text
        medium
        placeholder='Enter Amount To Bond' 
        value={form.bond}
        onChange={e => setForm({
          stash: form.stash,
          controller: form.controller,
          payee: form.payee,
          bond: e.target.value,
          nominate: nominate
        })}
      />
      <p>{bondError}</p>
    </Card>
  )
}
