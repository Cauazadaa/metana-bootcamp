// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract NftMint  {
bytes32 immutable root;
    constructor( bytes32 merkleroot) {
        root = merkleroot
    }
    mapping (address => bool) addr_minted;



    funtion _verify(bytes32[] calldata proof, bytes32 leaf) external view returns(bool){
        return MerkleProof.verify(proof,root,leaf);
    }
}