import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { myContract } from '../contract';
import { ethers, providers } from 'ethers';

const Home: NextPage = () => {
  const [maticBalance, setMaticBalance] = useState(0);
  const [tokenBalances, setTokenBalances] = useState<{ [key: string]: number }>({});
  const [isPolygon, setIsPolygon] = useState(true);

  useEffect(() => {
    const checkNetwork = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        // Check if Web3Provider is available
        if (typeof ethers.providers !== 'undefined' && ethers.providers.Web3Provider) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const { chainId } = await provider.getNetwork();
          setIsPolygon(chainId === 137); // Polygon Mainnet ID
        } else {
          alert('Ethers.js is not properly imported or Web3Provider is not available.');
        }
      } else {
        alert('Please install MetaMask or another Ethereum wallet.');
      }
    };

    checkNetwork();
  }, []);

  const handleMint = async () => {
    // Implement minting logic here
  };

  const handleForge = async () => {
    // Implement forging logic here
  };

  const fetchBalances = async () => {
    if (myContract) {
      // Fetch MATIC balance
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(accounts[0]);
      setMaticBalance(ethers.utils.formatEther(balance));

      // Fetch token balances (replace with your token methods)
      const token1Balance = await myContract.balanceOf(accounts[0], 'TOKEN1_ADDRESS'); // Replace with actual token address
      const token2Balance = await myContract.balanceOf(accounts[0], 'TOKEN2_ADDRESS'); // Replace with actual token address
      setTokenBalances({
        token1: token1Balance.toString(),
        token2: token2Balance.toString(),
      });
    }
  };

  useEffect(() => {
    if (isPolygon) {
      fetchBalances();
    } else {
      alert('Please switch to the Polygon network.');
    }
  }, [isPolygon]);

  return (
    <>
      <Head>
        <title>My DApp</title>
      </Head>
      <main className="container mt-5">
        <ConnectButton />
        <h1 className="text-center display-4 mb-4">Welcome to My DApp</h1>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Your Balances</h5>
            <p className="card-text">MATIC Balance: <strong>{maticBalance} MATIC</strong></p>
            <p className="card-text">Token Balances:</p>
            <ul>
              <li>Token 1: {tokenBalances.token1 || 0}</li>
              <li>Token 2: {tokenBalances.token2 || 0}</li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <button onClick={handleMint} className="btn btn-primary me-2">
            Mint Token
          </button>
          <button onClick={handleForge} className="btn btn-success">
            Forge Token
          </button>
        </div>
        <a href="https://opensea.io/" target="_blank" rel="noopener noreferrer" className="text-primary">
          Visit our OpenSea Page
        </a>
      </main>
    </>
  );
};

export default Home;
