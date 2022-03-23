import { ethers } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { getContract } from '../utils';

export function useContract(address, abi, readOnly) {
  const provider = ethers.getDefaultProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
  );

  return useMemo(() => {
    try {
      return getContract(address, abi, readOnly ? provider : provider);
    } catch (error) {
      return null;
    }
  }, [address, abi, readOnly, provider]);
}

// export async function useTokenBalance(tokenAddress, account) {
//   const [state, setState] = useState(null);

//   const provider = ethers.getDefaultProvider(
//     "https://data-seed-prebsc-1-s1.binance.org:8545/"
//   );
//   let tokenABI = ["function balanceOf(address) view returns (uint)"];

//   const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
  
//   useCallback(async() => {
//     try {
//       setState({
//         error: null,
//         loading: true,
//         response: null
//       });
//       const response = await contract.balanceOf(account);
//       setState({
//         error: null,
//         loading: false,
//         response: response
//       });
//     } catch (error) {
//       setState({
//         error: error,
//         loading: false,
//         response: null
//       });
//     }
//   },[])

//   return [{
//     data: state.response,
//     error: state.error,
//     loading: state.loading
//   }]
// }