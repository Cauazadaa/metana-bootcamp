
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSale is ERC20 {
    
    uint256 public constant TK_PRICE = 1000*10**decimals(); //price is 1000 for 1 eth
    
    uint256 public constant MAX_SUPPLY = 1000000*10**18; // sets max supply 
    
    uint public totalSold = 0 ;
    
    function BuyTokens ()external payable {
    
        uint256 amount = msg.value *1000; //1 eth = 1000 tks
    
        //verifies if it still has tokens left
    
        require(totalSold + amount <= MAX_SUPPLY);
    
        // add to the total sold tokens
    
        totalSold += amount ;
        _mint(msg.sender, amount);

        //function to withdraw
        function withdraw() external onlyOwner{
            uint256 balance = address(this).balance;
            require(balance > 0 ,"nothing to withdraw");
            payable (owner()).transfer(balance);
        }    
    
    }

0
