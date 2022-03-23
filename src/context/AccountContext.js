import { createContext, useEffect, useState } from "react";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
	web3Accounts,
	web3Enable,
	web3FromAddress,
	web3ListRpcProviders,
	web3UseRpcProvider,
} from "@polkadot/extension-dapp";

export const AccountContext = createContext();
export const AccountProvider = ({ children }) => {
	const [ethAccount, setEthAccount] = useState("");
	const [isTrust, setIsTrust] = useState(
		false || localStorage.getItem("wallet") === "walletconnect"
	);
	const [selAccounts, setSelAccounts] = useState([]);

	function disconnect() {
		localStorage.setItem("wallet", "");
		setEthAccount("");
	}

	async function connectSelendra() {
		try {
			// Check if there is Selendra or polkadot.js extensions available
			const extensions = await web3Enable("Selendra Park");
			if (extensions.length === 0) return;

			// Get all accounts from the extensions
			const accounts = await web3Accounts();
			if (accounts.length === 0) return;
			setSelAccounts(accounts);
		} catch (error) {
			console.log(error);
		}
	}

	async function connectMetamask() {
		const { ethereum } = window;
		if (!ethereum) return;
		try {
			await window.ethereum
				.request({ method: "eth_requestAccounts" })
				.then((accounts) => {
					setEthAccount(accounts[0]);
					setIsTrust(false);
					localStorage.setItem("wallet", "metamask");
				});
		} catch (error) {
			console.log(error);
		}
	}

	async function connectTrust() {
		try {
			const provider = new WalletConnectProvider({
				rpc: {
					56: "https://bsc-dataseed.binance.org",
				},
				qrcodeModalOptions: {
					mobileLinks: ["trust"],
				},
			});
			// enable session (triggers qr code modal)
			await provider.enable();

			const web3provider = new providers.Web3Provider(provider);
			const accounts = await web3provider.listAccounts();

			setEthAccount(accounts[0]);
			setIsTrust(true);
			localStorage.setItem("wallet", "walletconnect");
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(async () => {
		await connectSelendra();
	}, []);

	useEffect(() => {
		console.log(JSON.stringify(selAccounts, null, 4));
	}, [selAccounts]);

	useEffect(() => {
		isTrust ? connectTrust() : connectMetamask();
	}, [isTrust]);

	return (
		<AccountContext.Provider
			value={{
				ethAccount,
				selAccounts,
				isTrust,
				connectMetamask,
				connectTrust,
				disconnect,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
};
