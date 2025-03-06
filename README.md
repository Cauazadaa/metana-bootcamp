# Smart Contract Suite

This repository contains a suite of smart contracts for managing ERC20 tokens, minting and staking ERC721 NFTs, and handling payments with ERC20 tokens. The contracts are written in Solidity and are designed to be deployed on the Ethereum blockchain.

## Contracts Overview

### 1. ERC20 Token Contract (`erc20.sol`)

This contract implements a basic ERC20 token using OpenZeppelin's ERC20 library. It includes:

- **Token Name**: Dium
- **Token Symbol**: DIU
- **Initial Supply**: 1,000,000 DIU
- **Functionality**:
  - Minting of initial supply to the contract deployer.
  - Approval of minters to spend tokens on behalf of the owner.

### 2. ERC721 NFT Contract (`erc721.sol`)

This contract implements an ERC721 NFT with URI storage using OpenZeppelin's libraries. It includes:

- **NFT Name**: MyNFT
- **NFT Symbol**: MNFT
- **Max Supply**: 10 NFTs
- **Functionality**:
  - Minting of NFTs with metadata URI.
  - Base URI for metadata stored on IPFS.

### 3. NFT Minter and Staker Contract (`Tokentonftmint.sol`)

This contract allows users to mint and stake NFTs using an ERC20 token as payment. It includes:

- **Payment Token**: Configurable ERC20 token
- **Mint Price**: 10 tokens
- **Reward Rate**: 10 tokens per day
- **Functionality**:
  - Minting NFTs by paying with the specified ERC20 token.
  - Staking NFTs to earn rewards.
  - Withdrawing staked NFTs.
  - Claiming rewards based on staking duration.

### 4. Mintable ERC721 Contract (`ERC721mintable.sol`)

This contract is a mintable ERC721 NFT contract with URI storage. It includes:

- **NFT Name**: AnNft
- **NFT Symbol**: ANFT
- **Max Supply**: 100 NFTs
- **Functionality**:
  - Minting of NFTs with metadata URI by the contract owner.

## Getting Started

### Prerequisites

- **Node.js** and **npm**: Required for installing dependencies and running scripts.
- **Truffle** or **Hardhat**: Recommended for deploying and testing the contracts.
- **Ethereum Wallet**: Required for interacting with the deployed contracts.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/smart-contract-suite.git
   cd smart-contract-suite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Deployment

1. Configure your Ethereum network settings in `truffle-config.js` or `hardhat.config.js`.

2. Deploy the contracts:
   ```bash
   truffle migrate --network <network-name>
   ```

### Interacting with the Contracts

- Use a web3-enabled browser or a tool like Remix to interact with the deployed contracts.
- Ensure you have sufficient testnet ETH for gas fees when deploying and interacting with the contracts.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/contracts/) for their secure and community-reviewed smart contract libraries.
