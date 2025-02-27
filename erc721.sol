// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 public constant MAX_SUPPLY = 10;
    uint256 public totalMinted;
    string private baseTokenURI;
    mapping(uint256 => bool) private _tokenExists;

    constructor(string memory initialBaseURI) ERC721("MyNFT", "MNFT") {
        baseTokenURI = initialBaseURI;
    }

    function mintNFT(uint256 tokenId, string memory metadataURI) external {
        require(totalMinted < MAX_SUPPLY, "Max supply reached");
        require(!_tokenExists[tokenId], "Token already minted");
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, metadataURI);
        totalMinted++;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseTokenURI = _newBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }
}
