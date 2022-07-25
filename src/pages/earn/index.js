import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { Card } from "globalComponents";
import staking from "assets/icons/staking.svg";
import payout from "assets/icons/payout.svg";
import pool from "assets/icons/pool.svg";

export default function index() {
  return (
    <div>
      <h2>Earn</h2>
      <br/>
      <Row gutter={[16, 0]}>
        <Col span={8}>
          <Link to='/staking'>
            <div className='earn-menu-item'>
              <Card style={{height: "100%"}}>
                <img src={staking} alt='' width={32} />
                <h3>Staking</h3>
                <hr style={{marginBottom: '8px'}}/>
                <p>Staking your Selendra (SEL) allows you to passively earn rewards for your help to secure the network.</p>
              </Card>
            </div>
          </Link>
        </Col>
        <Col span={8}>
          <Link to='/staking/payout'>
            <div className='earn-menu-item'>
              <Card style={{height: "100%"}}>
                <img src={payout} alt='' width={32} />
                <h3>Payout</h3>
                <hr style={{marginBottom: '8px'}}/>
                <p>Selendra make stakers claim their rewards for past eras by submitting a transaction.</p>
              </Card>
            </div>
          </Link>
        </Col>
        <Col span={8}> 
          <Link to='/pools'>
            <div className='earn-menu-item'>
              <Card style={{height: "100%"}}>
                <img src={pool} alt='' width={32} />
                <h3>Pools</h3>
                <hr style={{marginBottom: '8px'}}/>
                <p>Coming soon...</p>
              </Card>
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  )
}
