const {ethers, upgrades} = require("hardhat");

async function  main() {
    const nft = await ethers.getContractFactory("AnNft");
    const NFT_deploy = await upgrades.deployProxy(nft, ["nftoken","NTF"], {
        initializer : "initialize"
    });
    await NFT_deploy.waitForDeployment();
    console.log("nft deployed at : ",await NFT_deploy.getAddress());

}
main().catch((error) => {
    console.error(error);
});