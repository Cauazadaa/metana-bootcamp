require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || "https://eth-sepolia.g.alchemy.com/v2/Uz69O0Sm7fxGF7Pbeh6FA3abrMTpNZBk",
      accounts: process.env.PRI_KEY !== undefined ? [process.env.PRI_KEY] : [],
    }
  },
  etherscan:{
    apiKey : process.env.ETHERSCAN_API, 
  }
};
