// Imports the Alchemy SDK
const { Alchemy, Network } = require("alchemy-sdk");

// Configures the Alchemy SDK
const config = {
    apiKey: "alcht_E93Fo0W3yaFTwqUXIQTUJarBIcztp0", 
    network: Network.ETH_MAINNET, 
};


let lastFetchedBlockNumbers = [];

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);

const fetchLatestBlocksData = async () => {
    
    //The response returns the block number of the most recently mined block
    const latestBlockNumber = await alchemy.core.getBlockNumber()
    const blocksData = [];
    const transferVolume = [];
    
    for(let i = 0; i <=10; i ++){
        const blockNumber = latestBlockNumber - i;
       const blockData = alchemy.core.getBlock(blockNumber);
    }

    const transfers = await alchemy.core.getAssetTransfers({
        fromBlock: toHex(blockNumber),
        toBlock: toHex(blockNumber),
        contractAddresses: 0x51Bb9c623226CE781F4A54FC8F4A530a47142b6B,
        category: ["external","erc20"]

    })

    const totalVolume = transfers.reduce((acc, transfer) => acc + parseFloat(transfer.value),0)
    transferVolume.push(totalVolume);
    blocksData.push(blockData);
};

return {
    blocksData,
    transferVolume,
};
function toHex(number){
    return '0x' + number.toString(16);
}