import { createContext, useState } from "react";

export const TokenContext = createContext();
export const TokenProvider = ({children}) => {
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedTokenPrice, setSelectedTokenPrice] = useState(1);

  return(
    <TokenContext.Provider
      value={{
        selectedToken,
        selectedTokenPrice,
        setSelectedToken,
        setSelectedTokenPrice
      }}
    >{children}</TokenContext.Provider>
  ) 
}