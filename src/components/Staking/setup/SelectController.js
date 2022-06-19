import { Col, Row } from 'antd'
import { Card } from 'globalComponents'
import { useEffect, useState } from 'react'
import { useAccounts } from '../../../hooks/useAccounts';
import { useStaking } from '../../../context/StakingContext';
import { getUsername, shortenAddress } from '../../../utils';
import ErrorHandling from '../ErrorHandling';

const selectedStyle = {
  borderColor: '#03a9f4'
}

export default function SelectController({
  nominate,
  form,
  setForm
}) {
  const { allAccounts } = useAccounts();
  const { getAccountLedger } = useStaking();
  const [ledger, setLedger] = useState();

  useEffect(() => {
    async function _getAccountLedger() {
      const ledger = await getAccountLedger(form.controller);
      setLedger(ledger);
    }
    _getAccountLedger();
  }, [form, getAccountLedger]);

  return (
    <Card>
      <h2>Set Controller Account</h2>
      <br/>
      <Row gutter={[16, 8]}>
        { allAccounts.map((i,key) =>
          <Col span={8} key={key}>
            <div 
              className='staking-controller'
              style={i === form.controller ? selectedStyle : {}}
              onClick={() => setForm({
                stash: form.stash,
                controller: i,
                payee: form.payee,
                bond: form.bond,
                nominate: nominate
              })}
            >
              <img
                alt=''
                src={`https://avatars.dicebear.com/api/pixel-art-neutral/${i}.svg`}
                width={40}
                style={{borderRadius: '20px'}}
              />
              <h3>{getUsername(i).toUpperCase()}</h3>
              <p>{shortenAddress(i)}</p>
            </div>
          </Col>
        )}
        {/* Controller error */}
        <ErrorHandling 
          form={form} 
          ledger={ledger} 
        />
      </Row>
    </Card>
  )
}
