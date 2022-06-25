import moment from 'moment';
import { Col, Row, Tooltip } from 'antd';
import { Card } from 'globalComponents';
import { useEraTimeLeft } from 'hooks/useEraTimeLeft';
import { useStaking } from 'context/StakingContext';
import Status from 'components/Staking/interface/Status';
import ActiveEraGraph from 'components/Staking/ActiveEraGraph';
import ListNominators from 'components/Staking/interface/ListNominators';
import BondedFund from 'components/Staking/interface/BondedFund';

export default function Earn() {
  const eraTimeLeft = useEraTimeLeft();
  const { staking, sessionEra, getNominationsStatus } = useStaking();

  const _nominations = getNominationsStatus();
  const activeNominations = 
    _nominations.length > 0 ? 
    _nominations.filter((i) => i.status === 'Active')
    : [];

  // format era time left
  const _timeleft = moment.duration(eraTimeLeft * 1000, 'milliseconds');
  // console.log(eraTimeLeft)
  const timeleft = `${_timeleft.hours()}:${_timeleft.minutes()}:${_timeleft.seconds()}`;

  function isStaked() {}

  return (
    <div>
      <h2>Staking</h2><br/>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card>
            <h2>{activeNominations.length}</h2>
            <h4>Active Nominator</h4>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card>
            <h2>{staking?.minNominatorBond} CDM</h2>
            <h4>Minimum Active Bond</h4>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card>
            <Row gutter={[8, 8]} align='middle'>
              <Col>
                <Tooltip title={timeleft} color='#03A9F4' key='#03A9F4'>
                  <div />
                  <ActiveEraGraph 
                    value={sessionEra.eraProgress}
                    value2={sessionEra.eraLength - sessionEra.eraProgress}
                  />
                </Tooltip>
              </Col>
              <Col>
                <h2>{staking?.activeEra.index}</h2>
                <h4>Active Era</h4>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <br/>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <BondedFund />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Status />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <ListNominators />
        </Col>
      </Row>
    </div>
  )
}
