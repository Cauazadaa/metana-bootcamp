const ethers = require (ethers);

const abi = [""];
const iface = new ethers.utils.Interface(abi);
const data =  iface.encodeFunctionData("Receive")