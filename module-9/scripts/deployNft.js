const {ethers, upgrades} = require("hardhat");

async function  main() {
    const nft = await ethers.getContractFactory("erc721");
    const NFT_deploy = await upgrades.deployProxy(nft, [nftoken],[NTF], {
        initializer : "initializer"
    });
    await NFT_deploy.deployed();
    console.log("nft deployed at : ",nft.address);

}
main().catch((error) => {
    console.error(error);
});