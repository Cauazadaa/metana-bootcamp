// Imports the Alchemy SDK
const { Alchemy, Network } = require("alchemy-sdk");

// Configures the Alchemy SDK
const config = {
    
    apiKey: "alcht_PMS5KjeM0DdICt6b2WV0wc5esh5EMX", 
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
        const blockData = await alchemy.core.getBlock(blockNumber);
        const tokenAddress = '0x51Bb9c623226CE781F4A54FC8F4A530a47142b6B';

    const transfersResponse = await alchemy.core.getAssetTransfers({
        fromBlock: toHex(blockNumber),
        toBlock: toHex(blockNumber),
        contractAddresses: [tokenAddress],
        category: ["external","erc20"],
        
    });
    const transfers = transfersResponse.transfers || [];
    
    
    const totalVolume = transfers.reduce((acc, transfer) => acc + parseFloat(transfer.value),0)
    transferVolume.push(totalVolume);
    console.log(totalVolume);
    blocksData.push(blockData);

    
    
}
return {
    blocksData,
    transferVolume,
};


};


const fetchBlockData = async () => {
    const baseFee = [];
    const block = await alchemy.core.getBlockWithTransactions();
    console.log("base fee per GAS: ",block.baseFeePerGas);
    console.log("gaslimit: ", block.gasLimit);
    return {

        number: block.number,    
        baseFee: parseFloat(block.baseFeePerGas),
        gasLimit: block.gasLimit,
        gasUsed: block.gasUsed,
    }; 

}
function toHex(number){
    return '0x' + number.toString(16);
}
module.exports =  {fetchLatestBlocksData,fetchBlockData};

fetchLatestBlocksData();
fetchBlockData();