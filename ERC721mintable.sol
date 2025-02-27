// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AnNft is ERC721URIStorage, Ownable {
    uint256 public totalMint;
    uint256 public constant maxsupply = 100;

    constructor() ERC721("AnNft", "ANFT") {
        totalMint = 0;
    }

    function mint(address to, uint256 tokenId, string memory metadataURI) external onlyOwner {
        require(totalMint < maxsupply, "Max supply reached");
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
        totalMint++;
    }
}