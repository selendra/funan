import { Col, Row } from 'antd';
import { Card } from 'globalComponents';
import { useAccounts } from 'hooks/useAccounts';
import { getUsername, shortenAddress } from 'utils';
import ErrorHandling from '../ErrorHandling';

const selectedStyle = {
  borderColor: '#03a9f4'
}

export default function SelectController({
  nominate,
  form,
  setForm,
  warning,
  error
}) {
  const { allAccounts } = useAccounts();

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
              <h3>{getUsername(i)}</h3>
              <p>{shortenAddress(i)}</p>
            </div>
          </Col>
        )}
        {/* Controller error */}
        <ErrorHandling 
          warning={warning}
          error={error}
        />
      </Row>
    </Card>
  )
}
