import { ethers } from "ethers";

const ABI = [];
const address = '';

let provider;
let signer;
let myContract;

if (typeof window !== 'undefined' && window.ethereum) {
    // This code will only run in the browser
    (async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        myContract = new ethers.Contract(address, ABI, provider);
    })();
} else {
    console.error("MetaMask is not installed");
}

export { myContract };