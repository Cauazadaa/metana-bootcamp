# ERC20 Token with God-Mode, Sanctions, Token Sale, and Partial Refunds

## Overview

This project is a Solidity-based ERC20 token contract that includes additional functionalities, such as:

1. **God-Mode**: A special address can mint, burn, and transfer tokens from other addresses.
2. **Sanctions**: A centralized authority can prevent sanctioned addresses from interacting with the token.
3. **Token Sale**: Users can purchase tokens by paying ETH, with a fixed price and a maximum supply.
4. **Partial Refunds**: Users can transfer tokens back to the contract and receive partial refunds in ETH.

This project extends OpenZeppelin’s ERC20 implementation to include the features specified in the project description.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

### ERC20 with God-Mode
- **mintTokensToAddress(address recipient)**: Mint tokens to a specified address.
- **changeBalanceAtAddress(address target)**: Change the balance of a given address.
- **authoritativeTransferFrom(address from, address to)**: Allow a special address to forcefully transfer tokens.

### ERC20 with Sanctions
- Allows a centralized authority to block addresses from sending or receiving tokens by adding them to a blacklist.
- Only the centralized authority can add/remove addresses from the blacklist.

### Token Sale
- Users can purchase tokens at a fixed price: 1000 tokens for 1 ETH.
- Maximum supply of 1 million tokens.
- The sale stops once the 1 million token cap is reached.

### Partial Refunds
- Users can sell back their tokens to the contract for a refund of 0.5 ETH per 1000 tokens.
- The contract must have enough ETH to pay the user.
- Minting and selling back tokens is limited to the available supply and ETH balance.

## Installation

### Requirements
- Node.js
- Solidity version ^0.8.x
- OpenZeppelin Contracts
- Remix IDE or any Ethereum-compatible development environment

### Steps to Install
1. Clone the repository or download the code.
2. Install OpenZeppelin Contracts (if not using Remix, which includes these by default).
   ```bash
   npm install @openzeppelin/contracts
