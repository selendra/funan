import { Contract } from "ethers";
import { u8aToHex } from "@polkadot/util";
import keyring from '@polkadot/ui-keyring';
import { formatBalance } from "@polkadot/util";
import { checkAddress, decodeAddress } from '@polkadot/util-crypto';
import { BigNumber } from 'bignumber.js';
import { tokens } from "../constants/tokenContract";
import { payee } from '../constants/staking';

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

export function getUsername(address) {
  if(!address) return;
  try {
    const account = keyring.getPair(address);
    return account ? account.meta.name.toUpperCase() : '';
  } catch (error) {}
}

export function shortenAddress(address) {
  if(!address) return;
  return address.slice(0, 5) + '...' + address.slice(-4);
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

export function getRewardDest(_payee) {
  let rewardDest;
  payee.map((i, key) => {
    if(i.value === _payee) return rewardDest = payee[key].title;
    return rewardDest;
  })
  return rewardDest;
}

export function FormatBalance(amount) {
  return formatBalance(amount, { withSi: false, forceUnit: '-' }, 18)
}

export function FormatFee(amount) {
  return formatBalance(amount, {withSiFull: true, decimals: 18, withUnit: false })
}

export const removePercentage = (str) => {
  return Number(str.slice(0, -1));
}

export function formatBN(amount) {
  if(!amount) return;
  return new BigNumber(amount)
  .dividedBy(Math.pow(10, 18))
  .toNumber()
}

export function rmCommas(val) {
  return val.replace(/,/g, '');
};

export function getAddress() {
  
}