import { Button, Card, Form, Input } from 'antd'

export default function Buy() {
  

  return (
    <div 
      style={{
        maxWidth: '720px',
        margin: '0 auto'
      }}
    >
      <Card style={{borderRadius: '8px'}}>
        <center className='buy-header'>
          <h2>Selendra Native Token Sale</h2>
          <p>Selendra community auction program is open for anyone to buy SEL token up to USD 100.00 and limited time bound.</p>
        </center>
        <Form layout='vertical'>
          <Form.Item label='Amount'>
            <Input placeholder='Enter Amount' className='buy-input' />
          </Form.Item>
          <Form.Item label='Selendra Address'>
            <Input placeholder='Enter Selendra Address' className='buy-input' />
          </Form.Item>
          <Form.Item>
            <Button className='buy-btn'>Approve</Button>
          </Form.Item>
        </Form>
      </Card>  
    </div>
  )
}
