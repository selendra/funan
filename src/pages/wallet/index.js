import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LayoutComponent from "../../components/Layout";
import WalletMenu from "../../components/WalletMenu";

export default function Wallet() {
  let navigate = useNavigate();
  
  useEffect(() => {
    navigate('/wallet/send');
  },[navigate]);
  
  
  return (
    <LayoutComponent>
      <WalletMenu />
    </LayoutComponent>
  );
}
