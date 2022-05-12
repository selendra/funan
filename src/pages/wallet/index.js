import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
  let navigate = useNavigate();
  
  useEffect(() => {
    navigate('/wallet/send');
  },[navigate]);

  return null;
}
