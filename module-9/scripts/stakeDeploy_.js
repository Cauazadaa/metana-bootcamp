const { ethers , upgrades} = require ("hardhat");

async function main() {
    const MyContract = await ethers.getContractFactory("NFTMinterAndStaker");
    const Dcontract = await upgrades.deployProxy(MyContract,[paymentoken , ])
}