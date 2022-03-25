import { ethers } from "ethers";
import SelendraV2ABI from '../../abis/bridge/selendraV2.json';
import SelendraHandlerABI from "../../abis/bridge/selendraHandle.json";
import Erc20ABI from "../../abis/bridge/erc20.json";
import BridgeABI from "../../abis/bridge/bridge.json";
import { bridge, selendra, selendraV2 } from "../../constants/bridge";
import { Signer } from "../getSigner";
import { getHex } from "../index";

export async function approveForHandler(amount){
  console.log("Start Approve before transfer ...")
  const signer = await Signer();
  // eslint-disable-next-line no-undef
  const approveAmount = BigInt(amount * Math.pow(10, 18));
  
  const erc20Instance = new ethers.Contract(
    selendraV2.SELENDRAADDRESS,
    SelendraV2ABI.abi,
    signer
  );

  const tx = await erc20Instance.approve(
    selendraV2.SELENDRAHANDLERS, 
    approveAmount
  );

  await tx.wait();
}

export async function selendraToWrap(amount) {
  console.log("Start transfer to WrapSelendra...")
  const signer = await Signer();
  // eslint-disable-next-line no-undef
  const swapAmount = BigInt(amount * Math.pow(10, 18));

  const selendraHandle = new ethers.Contract(
    selendraV2.SELENDRAHANDLERS, 
    SelendraHandlerABI.abi, 
    signer
  );

  const tx = await selendraHandle.swapBridge(swapAmount);
  await tx.wait();

  // await saveSW(wallet.address, amount, tx.hash);
}

export async function wrapApprove(amount){
  console.log("Start Approve before transfer ...");
  const signer = await Signer();
  // eslint-disable-next-line no-undef
  const approveAmount = BigInt(amount * Math.pow(10, 18));
  
  const erc20Instance = new ethers.Contract(
    bridge.ERC20CONTRACT, 
    Erc20ABI.abi, 
    signer
  );

  const tx = await erc20Instance.approve(
    bridge.ERC20HANDLERCONTRACT, 
    approveAmount
  );

  await tx.wait();
}

export async function wrapTransfer(substrateAdress, amount){
  console.log("Start Wrap transfer...");
  const signer = await Signer();
  const recipient = getHex('ser2Aqf84arKvjGDu9UJZXXBBKEKv5fm6nBbD2cuCMakYaKLr');
  // eslint-disable-next-line no-undef
  const transferAmount = BigInt(amount * Math.pow(10, 18));

  const bridgeInstance = new ethers.Contract(
    bridge.BRIDGECONTRACT, 
    BridgeABI.abi, 
    signer,
  );
  const data = '0x' +
    ethers.utils.hexZeroPad(ethers.BigNumber.from(transferAmount).toHexString(), 32).substr(2) +    // Deposit Amount        (32 bytes)
    ethers.utils.hexZeroPad(ethers.utils.hexlify((recipient.length - 2)/2), 32).substr(2) +    // len(recipientAddress) (32 bytes)
    recipient.substr(2);

  const tx = await bridgeInstance.deposit(
    selendra.SELENDRABRIDGECHAINID, 
    bridge.BRIDGERESOURCEID, 
    data,
  );

  // await saveWN(wallet.address, substrateAdress, amount, tx.hash);

  await tx.wait();
}