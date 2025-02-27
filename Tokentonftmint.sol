// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./ERC721mintable.sol";

contract NFTMinterAndStaker {

    

    IERC20 public paymentoken;
    AnNft public nftcontract;
    uint public mintprice = 10 *(10 ** 18);
    uint public rewardRate = 10 *(10 ** 18);
    mapping(uint256 => address) public stakedby;
    mapping(uint256 => uint256) public stakingStart;

    constructor(address _paymentToken, address _nftcontract){
        _paymentToken = IERC20(_paymentToken);
        nftcontract = AnNft(_nftcontract);

    }
    function mintNFT(uint256 tokenId,string memory metadataURI) external {
        require(paymentoken.transferFrom(msg.sender, address(this), mintprice), "Payment failed");
        nftcontract.mint(msg.sender, tokenId, metadataURI);
    }

    function stakeNFT(uint256 tokenId) external {
        require(nftcontract.ownerOf(tokenId) == msg.sender,"not the owner");
         nftcontract.transferFrom(msg.sender, address(this), tokenId);
         stakedby[tokenId] = msg.sender;
         stakingStart[tokenId] = block.timestamp;
    }

    function withdrawNFT(uint256 tokenId) external {
        require(stakedby[tokenId] == msg.sender,"not the owner");
        nftcontract.transferFrom(address(this), msg.sender, tokenId);
        stakedby[tokenId] = address(0);
        stakingStart[tokenId] = 0;
    }
    function claimRewards(uint256 tokenId) external {
        require(stakedby[tokenId] == msg.sender,"not the owner");
        uint256 stakedTime = block.timestamp - stakingStart[tokenId];
        uint reward = (stakedTime / 1 days) *rewardRate;
        stakingStart[tokenId] = block.timestamp;
        paymentoken.transfer(msg.sender, reward);
    }

}