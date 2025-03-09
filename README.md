# ERC20 Token Variants

This project contains custom implementations of the ERC20 standard using the OpenZeppelin library. There are four token variations, each with specific functionalities:

## Implemented Features

### 1. ERC20 with God-Mode
- A special address can:
  - Mint new tokens to any address
  - Change the balance of any user
  - Transfer tokens arbitrarily between addresses

### 2. ERC20 with Sanctions
- An admin can add or remove addresses from a sanctions list.
- Sanctioned addresses cannot send or receive tokens.

### 3. ERC20 with Token Sale
- Users can buy 1000 tokens by sending 1 ETH to the contract.
- The maximum supply is 1 million tokens.
- The contract owner can withdraw ETH from the contract.

### 4. ERC20 with Token Sale and Partial Refunds
- In addition to buying, users can sell tokens back to the contract.
- For every 1000 tokens transferred to the contract, the user receives 0.5 ETH.
- The transaction fails if the contract does not have enough ETH to refund.

---

## How to Run the Project

### Prerequisites
- Node.js and npm
- Hardhat
- Configured MetaMask account

### Steps to Run
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/ERC20-variants.git
   cd ERC20-variants
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Compile the contracts:
   ```sh
   npx hardhat compile
   ```

4. Run the tests:
   ```sh
   npx hardhat test
   ```

5. Deploy to a local network:
   ```sh
   npx hardhat node
   ```
   In another terminal tab:
   ```sh
   npx hardhat run scripts/deploy.js --network localhost
   ```

---

## References
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Hardhat Documentation](https://hardhat.org/docs)

If you have any questions or suggestions, open an issue! 🚀

