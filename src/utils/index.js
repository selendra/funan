import { message } from 'antd';
import { checkAddress } from '@polkadot/util-crypto';
import { Contract } from "ethers";

export function isvalidSubstrateAddress(address) {
  const check = checkAddress(address, 42);
  const check2 = checkAddress(address, 972);

  if (check[0] || check2[0]) {
    return true;
  } else {
    return false;
  }
}

export function shortenAddress(address) {
  if(!address) return;
  return address.slice(0, 4) + '...' + address.slice(-3);
}

export function ErrorHandling(err) {
  if(err.code === 4001) message.error('The request was rejected!');
  if(err.code === -32603) message.error(err.data.message);
}

export function getContract(address, abi, signerOrProvider) {
  return new Contract(address, abi, signerOrProvider);
}