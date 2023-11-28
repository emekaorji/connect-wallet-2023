import Web3 from 'web3';
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
	interface Window {
		ethereum?: MetaMaskInpageProvider;
		web3?: Web3;
	}
}
