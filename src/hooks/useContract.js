import { ethers, Signer } from 'ethers';
import { useState, useEffect } from 'react';

export const useContract = async (address, abi) => {
  const [contract, setContract] = useState(null);
  const signer = await Signer();

  useEffect(() => {
    setContract(new ethers.Contract(address, abi, signer));
  }, [address, abi, signer]);

  return contract;
}