const {ethers, upgrades} = require("hardhat");

async function main() {
    const erc = await ethers.getContractFactory("MyTokenUpgradeable");
    const erc20 = await upgrades.deployProxy(erc,["token"],["TKN"],{
        initializer : "initialize"
    });
    await erc20.deployed();
    console.log("ERC20 deployed to: ", erc20.address);
}
main().catch((error)=> {
console.error(error);
});