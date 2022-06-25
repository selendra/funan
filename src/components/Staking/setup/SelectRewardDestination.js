import React from 'react'
import { Col, Row } from 'antd'
import { Card } from 'globalComponents'

const selectedStyle = {
  borderColor: '#03a9f4'
}

export default function SelectRewardDestination({
  form,
  setForm,
  nominate,
  options
}) {
  return (
    <Card>
      <h2>Reward Destination</h2>
      <Row gutter={[8, 8]} align='middle'>
        { options.map((i, key) =>
          <Col key={key} xs={24} sm={24} md={12} lg={12} xl={12}>
            <div 
              className='staking-rewardOption'
              style={i.value === form.payee ? selectedStyle : {}}
              onClick={() => setForm({
                stash: form.stash,
                controller: form.controller,
                payee: i.value,
                bond: form.bond,
                nominate: nominate
              })}
            >
              <h3>{i.title}</h3>
              <p>{i.subtitle}</p>
            </div>
          </Col>
        )}
      </Row>
    </Card>
  )
}
