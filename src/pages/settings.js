import { Row, Col, Radio } from "antd";
import { Card, Button } from "globalComponents";
import { useTheme } from "next-themes";
import { useAddSELToken } from "../hooks/useAddSELToken";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [handleAddSELToken] = useAddSELToken();

  function onChange(e) {
    setTheme(e.target.value);
  }

  const socialMedia = [
    {
      icon: "ri-telegram-fill",
      link: "",
    },
    {
      icon: "ri-facebook-fill",
      link: "",
    },
    {
      icon: "ri-twitter-fill",
      link: "",
    },
    {
      icon: "ri-linkedin-fill",
      link: "",
    },
    {
      icon: "ri-medium-fill",
      link: "",
    },
    {
      icon: "ri-github-fill",
      link: "",
    },
  ];

  return (
    <div>
      {/* === >>> Wallet Section <<< === */}
      <h2>Selendra Wallet</h2>
      <Card>
        <div className="setting__padding">
          <h2>Theme</h2><br />
          <Radio.Group onChange={onChange} value={theme}>
            <Radio value='light'>Light</Radio>
            <Radio value='dark'>Dark</Radio>
          </Radio.Group>
        </div>
      </Card>
      <br />
      {/* === >>> MetaMask Section <<< === */}
      <h2>Metamask</h2>
      <Card>
        <div className="setting__padding">
          <h2>Assets</h2>
          <Row className="metamask-section" gutter={[0, 20]}>
            <Col>
              <Button.Primary className="add-mainnet" onClick={handleAddSELToken}>Add SEL Token</Button.Primary>
            </Col>
          </Row>
        </div>
      </Card>
      <br />
      {/* === >>> Link Section <<< === */}
      <h2>Links</h2>
      <Card>
        <div className="setting__padding">
          <a href="/setting">
            <p>How to use Selendra fWallet </p>
          </a>
          <br />
          <a href="/setting">
            <p>Selendra Explorer </p>
          </a>

          <div className="setting-social-media">
            { socialMedia.map((res) => 
              <i class={res.icon}></i>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
