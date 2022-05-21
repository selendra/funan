import { Col, Row, Spin } from "antd";
import { ethers } from "ethers";

export default function TokenBalance({ image, TokenName, loading, balance }) {
  function formatBalance(value) {
    if (!value) return;
    return ethers.utils.formatUnits(value, 18);
  }
  const formatedBalance = formatBalance(balance);

  return (
    <Row justify="space-between" align="middle" style={{ margin: "16px 0" }}>
      <Col>
        <Row gutter={[12, 12]} align="middle">
          <Col>
            <img src={image} alt={image} width="30" height="30" />
          </Col>
          <Col>
            <div className="profile__selPrice">
              <p>{TokenName}</p>
            </div>
          </Col>
        </Row>
      </Col>
      <Col>
        <Spin spinning={loading} />
        {!loading && (
          <div className="profile__estimateValue">
            <p>{(+formatedBalance).toFixed(5) + " " + TokenName}</p>
          </div>
        )}
      </Col>
    </Row>
  );
}
