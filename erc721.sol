// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract  MyNFT is ERC721, Ownable {
    uint256 public constant MAX_SUPPLY = 10;
    uint256 public totalMinted = 0;
    uint256 public constant price = 0 ether;    

    constructor() ERC721("MyNFT", "MNFT") {
        
    }

    function mint(string memory metadataURI) external payable {
        require(totalMinted < MAX_SUPPLY, "Exceeded NFT supply");
        require(msg.value == price, "Incorrect payment");
        _mint(msg.sender, totalMinted);
        _setTokenURI(totalMinted, metadataURI);
        totalMinted++;
    }


    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafybeife47h5tdhytkrjak3bvzicsx6ea4sjcan4v5fjpmrwrdctaws32/";
    }
}
