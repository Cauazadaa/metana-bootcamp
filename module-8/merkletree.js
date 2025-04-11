const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

// List of addresses eligible for the airdrop
const addresses = [
  "0x123...", 
  "0x456...",
  "0x789..."
];

// Convert addresses into leaves 
const leaves = addresses.map((addr , index ) => keccak256(addr + index));
const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });

const root = merkleTree.getHexRoot(); // Get the Merkle Root
console.log("Merkle Root:", root);

// Generate proof for a specific address 
const leaf = keccak256("0x123..."); // Replace with an actual address
const proof = merkleTree.getHexProof(leaf); //msg.sender HAHAH
console.log("Proof for 0x123...:", proof);
