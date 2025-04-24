// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./erc721.sol";

contract NFTMinterAndStaker is Initializable, OwnableUpgradeable, IERC721ReceiverUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;
    
    IERC20Upgradeable public paymentoken;
    AnNft public nftcontract;
    uint public mintprice;
    uint public rewardRate;
    mapping(uint256 => address) public stakedby;
    mapping(uint256 => uint256) public stakingStart;

    function initialize(address _paymentToken, address _nftcontract) public initializer {
        __Ownable_init();
        
        paymentoken = IERC20Upgradeable(_paymentToken);
        nftcontract = AnNft(_nftcontract);
        mintprice = 10 * (10 ** 18);
        rewardRate = 10 * (10 ** 18);
    }
    
    function mintNFT(address to, uint256 tokenId, string memory metadataURI) external {
        require(paymentoken.transferFrom(msg.sender, address(this), mintprice), "Payment failed");
        nftcontract.mint(to, tokenId, metadataURI);
    }

    function stakeNFT(uint256 tokenId) external {
        require(nftcontract.ownerOf(tokenId) == msg.sender, "not the owner");
        nftcontract.transferFrom(msg.sender, address(this), tokenId);
        stakedby[tokenId] = msg.sender;
        stakingStart[tokenId] = block.timestamp;
    }

    function withdrawNFT(uint256 tokenId) external {
        require(stakedby[tokenId] == msg.sender, "not the owner");
        nftcontract.transferFrom(address(this), msg.sender, tokenId);
        stakedby[tokenId] = address(0);
        stakingStart[tokenId] = 0;
    }
    
    function claimRewards(uint256 tokenId) external {
        require(stakedby[tokenId] == msg.sender, "not the owner");
        uint256 stakedTime = block.timestamp - stakingStart[tokenId];
        uint reward = (stakedTime / 1 days) * rewardRate;
        stakingStart[tokenId] = block.timestamp;
        paymentoken.transfer(msg.sender, reward);
    }
    
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}