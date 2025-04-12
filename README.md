# NTL NFT Project

## Project Description
The NTL NFT project is a smart contract-based application that allows users to mint NFTs using a commit-reveal scheme and Merkle tree verification. The project includes features such as multicall for batch operations, a state machine to manage sale states, and a pull pattern for secure fund withdrawals.

## Features
- **Commit-Reveal Scheme:** Ensures randomness and fairness in NFT ID allocation.
- **Merkle Tree Verification:** Only addresses included in the Merkle tree can mint NFTs.
- **State Machine:** Manages different sale states (CLOSED, PRESALE, PUBLIC_SALE, SOLD_OUT).
- **Multicall Functionality:** Allows batch operations for transferring multiple NFTs in one transaction.
- **Pull Pattern for Withdrawals:** Securely handles fund withdrawals to designated addresses.

## Setup
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**
   Ensure you have Node.js and npm installed, then run:
   ```bash
   npm install
   ```

3. **Compile Contracts:**
   Use a Solidity compiler to compile the smart contracts.

4. **Deploy Contracts:**
   Deploy the contracts to your preferred Ethereum network.

## Usage
- **Minting NFTs:**
  - Users must commit a secret and reveal it after a specified number of blocks to mint an NFT.
  - Only addresses verified by the Merkle tree can mint.

- **Multicall Operations:**
  - Use the `multicall` function to execute multiple encoded function calls in one transaction.

- **Withdrawals:**
  - Designated addresses can withdraw funds using the pull pattern.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
