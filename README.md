

# **Capture The Ether - Solidity Security **  

This repository contains Solidity smart contract security challenges from the **Capture The Ether** platform. The goal is to analyze vulnerabilities, write exploits, and test them using **Hardhat**.  

## 📌 **Project Overview**  
- Tests written in **JavaScript/TypeScript** using the Hardhat framework.  
- Exploits vulnerabilities in Solidity contracts, including **reentrancy, integer overflows, and access control flaws**.  
- Simulates attacks using test cases to validate solutions.  

## 🚀 **Setup & Installation**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/YOUR_USERNAME/CaptureTheEther_Hardhat.git
cd CaptureTheEther_Hardhat
```

### **2️⃣ Install Dependencies**  
Ensure you have **Node.js** and **Hardhat** installed. Then, install the required dependencies:  
```sh
npm install
```

### **3️⃣ Configure Hardhat**  
Initialize Hardhat if not already set up:  
```sh
npx hardhat
```
Select **"Create an empty hardhat.config.js"** if prompted.  


### **Example: Writing a Test for Reentrancy Attack**  
```javascript
const { expect } = require("chai");

describe("Reentrancy Challenge", function () {
    it("Should drain contract funds using reentrancy attack", async function () {
        const [attacker] = await ethers.getSigners();
        const Reentrancy = await ethers.getContractFactory("Reentrancy");
        const reentrancyContract = await Reentrancy.deploy();
        await reentrancyContract.deployed();

        const AttackContract = await ethers.getContractFactory("ReentrancyAttack");
        const attackContract = await AttackContract.deploy(reentrancyContract.address);
        await attackContract.deployed();

        // Execute attack
        await attackContract.attack({ value: ethers.utils.parseEther("1") });

        // Check if funds were drained
        expect(await ethers.provider.getBalance(reentrancyContract.address)).to.equal(0);
    });
});
```

## ✅ **Running Tests**  
Run all test cases using Hardhat:  
```sh
npx hardhat test
```
To run a specific test file:  
```sh
npx hardhat test test/Reentrancy.test.js
```

## 📖 **References**  
- [Capture The Ether](https://capturetheether.com/)  
- [Hardhat Documentation](https://hardhat.org/docs/)  
- [Solidity Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)  

---

