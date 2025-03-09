
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract PrtialRef is ERC20, Ownable{
    function sellBack (uint256 amount) external {
        //calculates the ether qtd the user should receive 
        uint256 etherAmount = (amount * 0.5 ether) / 1000;
        //verifies if the contrract has suficcient balance 
        uint256 contractBalance = address(this).balance;
        require(contractBalance >= etherAmount, "INsuficcient balance");
    //old tokens get burned 
        _burn(msg.sender, amount);
        //transfers ether 
        payable (msg.sender).transfer(etherAmount);
    }
}