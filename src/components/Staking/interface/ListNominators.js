import { useState, useEffect } from 'react';
import { Col, message, Row, Tooltip } from 'antd';
import { Button, Card } from 'globalComponents';
import { CopyToClipboard } from "react-copy-to-clipboard";
import StopNominator from '../modal/StopNominator';
import { useValidator } from '../../../context/ValidatorContext';
import { useBalance } from 'context/BalanceContext';

const selectedStyle = {
  borderColor: '#03a9f4'
}

export default function ListNominators() {
  const { getValidatorPrefs } = useValidator();
  const { bondedAccounts } = useBalance();
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [nominationsMeta, setNominationsMeta] = useState([]);

  useEffect(() => {
    async function getNominations() {
      const _nominators = await getValidatorPrefs();
      setNominationsMeta(_nominators);
    }
    getNominations();
  },[getValidatorPrefs])

  function selectNominees(address) {
    if(!selected.includes(address)) {
      setSelected(
        nominate => !nominate.includes(address)
        ? nominate.concat(address)
        : nominate
      )
    } 
    if(selected.includes(address)) {
      setSelected(
        nominate => nominate.includes(address)
        ? nominate.filter((a) => a !== address)
        : nominate
      )
    }
  }

  if(!bondedAccounts) return <div/>

  return (
    <div>
      <Card>
        <Row justify='space-between'>
          <Col>
            <h2>Nominations</h2>
            <p>Your nominations</p>
          </Col>
          <Col>
            { nominationsMeta.length > 0 ?
              <Button.Primary onClick={() => setModal(true)}>Stop All</Button.Primary>
              :
              <Button.Primary>Nominate</Button.Primary>
            }
          </Col>
        </Row>
        <hr style={{margin: '16px 0'}} />
        <Row justify='end'>
          { selected.length > 0 &&
            <Button.Primary onClick={() => setModal(true)}>Stop {selected.length} Nomination</Button.Primary>
          }
        </Row>
        <br/>
        { nominationsMeta.length > 0 && nominationsMeta.map((i, key) =>
          <div className='staking_nominate' style={selected.includes(i.address) ? selectedStyle : {}} key={key} onClick={() => selectNominees(i.address)}>
            <Row justify='space-between'>
              <Col span={20}>
                <Row gutter={[8,8]} align='middle'>
                  <Col>
                    <img
                      alt=''
                      src={`https://avatars.dicebear.com/api/pixel-art-neutral/${i?.address}.svg`}
                      width={40}
                      style={{borderRadius: '20px'}}
                    />
                  </Col>
                  <Col>
                    <p>{i?.address}</p>
                    <p>{i?.identity}</p>
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <Row justify='end'>
                  <CopyToClipboard text={i?.address}>
                    <Tooltip title='Copy Address' color='#03A9F4'>
                      <Button onClick={() => message.success("Copied")}>
                        <img
                          src="/icons/bulk/copy.svg"
                          alt="money-recive.svg"
                          height="24px"
                        />
                      </Button>
                    </Tooltip>
                  </CopyToClipboard>
                </Row>
              </Col>
            </Row>
            <hr style={{margin: '4px 0'}} />
            <Row>
              <Col span={12}>
                <p>{i?.status}</p>
              </Col>
              <Col span={12}>
                <Row justify='end'>
                  <p>commission: {i?.prefs.commission}%</p>
                </Row>
              </Col>
            </Row>
          </div> 
        )}
        { nominationsMeta.length === 0 &&
          <h3>Not nominating.</h3>
        }
      </Card>

      <StopNominator 
        visible={modal}
        setVisible={setModal}
        selected={selected}
      />
    </div>
  )
}
