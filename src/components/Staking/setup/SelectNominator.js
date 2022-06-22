import React from 'react'
import { Col, Row } from 'antd'
import { Card } from 'globalComponents'
import { useValidator } from '../../../context/ValidatorContext';

const selectedStyle = {
  borderColor: '#03a9f4'
}

export default function SelectNominator({
  nominate,
  setNominate
}) {
  const { validators } = useValidator();
  
  function handleSelectValidator(address) {
    if(!nominate.includes(address)) {
      setNominate(
        nominate => !nominate.includes(address) && (nominate.length) < (validators?.length)
        ? nominate.concat(address)
        : nominate
      )
    } 
    if(nominate.includes(address)) {
      setNominate(
        nominate => nominate.includes(address)
        ? nominate.filter((a) => a !== address)
        : nominate
      )
    }
  }

  return (
    <Card>
      <h2>Nominate</h2>
      { validators.map((i, key) => 
        <Row 
          className='staking-nominate' 
          style={nominate.includes(i.address) ? selectedStyle : {}}
          key={key} 
          gutter={[8, 8]} 
          align='middle'
          justify='space-between'
          onClick={() => handleSelectValidator(i.address)}
        >
          <Col>
            <img
              alt=''
              src={`https://avatars.dicebear.com/api/pixel-art-neutral/${i.address}.svg`}
              width={32}
              style={{borderRadius: '16px'}}
            />
            <p>{i.address}</p>
          </Col>
          <Col>
            <p>commission: {i.prefs.commission}%</p>
          </Col>
        </Row>        
      )}
    </Card>
  )
}
