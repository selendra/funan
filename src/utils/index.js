import { message } from 'antd';
import { Contract } from "ethers";
import { u8aToHex } from "@polkadot/util";
import { formatBalance } from "@polkadot/util";
import { checkAddress, decodeAddress } from '@polkadot/util-crypto';
import { tokens } from "../constants/tokenContract";
import keyring from '@polkadot/ui-keyring';

export function isValidSubstratePassword(pass) {
  return keyring.isPassValid(pass);
}

export function isvalidSubstrateAddress(address) {
  const check = checkAddress(address, 42);
  const check2 = checkAddress(address, 204);

  if (check[0] || check2[0]) {
    return true;
  } else {
    return false;
  }
}

export function shortenAddress(address) {
  if(!address) return;
  return address.slice(0, 5) + '...' + address.slice(-4);
}

export function ErrorHandling(err) {
  if(err.code === 4001) message.error('The request was rejected!');
  if(err.code === -32603) message.error(err.data.message);
}

export function getContract(address, abi, signerOrProvider) {
  return new Contract(address, abi, signerOrProvider);
}

export function getHex(substrateAdress){
  const publicKey = decodeAddress(substrateAdress);
  const hexPublicKey = u8aToHex(publicKey);
  return hexPublicKey
}

export function getTokenName(address) {
  if(address === tokens[0].tokenAddress) return "BUSD";
  else if(address === tokens[1].tokenAddress) return "DAI";
  else if(address === tokens[2].tokenAddress) return "USDT";
  else if(address === tokens[3].tokenAddress) return "ETH";
  else if(address === "0x0000000000000000000000000000000000000000") return "BNB";
  else return;
}

export function FormatBalance(amount) {
  return formatBalance(amount, { withSi: false, forceUnit: '-' }, 18)
}