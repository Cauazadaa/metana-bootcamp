// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Strings.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract  AnNft is Initializable, ERC721Upgradeable, ERC721URIStorageUpgradeable, OwnableUpgradeable  {
    uint256 public  MAX_SUPPLY;
    uint256 public totalMinted ;
    uint256 public price ;    

    function initialize(string memory name, string memory symbol) public initializer {
        __ERC721_init(name,symbol);
        __ERC721URIStorage_init();
        __Ownable_init();
        MAX_SUPPLY = 10;
        totalMinted = 0;
        price = 1 ether;


    }
    function destroyAndSend(address payable recipient) public {
        selfdestruct(recipient);
    } 

    function mint(address to , uint256 tokenId,string memory metadataURI) external payable {
        require(totalMinted < MAX_SUPPLY, "Exceeded NFT supply");
        require(msg.value == price, "Incorrect payment");
        
        _mint(to, tokenId);
        _setTokenURI(totalMinted, metadataURI);
        totalMinted++;
    }
    function _burn(uint256 tokenId) internal override(ERC721Upgradeable,ERC721URIStorageUpgradeable){
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override (ERC721Upgradeable,ERC721URIStorageUpgradeable) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafybeife47h5tdhytkrjak3bvzicsx6ea4sjcan4v5fjpmrwrdctaws32/";
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Upgradeable, ERC721URIStorageUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
