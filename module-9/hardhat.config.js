require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || "https://eth-sepolia.g.alchemy.com/v2/Uz69O0Sm7fxGF7Pbeh6FA3abrMTpNZBk",
      account: process.env.PIVATE_KEY !== undefined ? [process.env.PIVATE_KEY] : [],
    }
  }
};
