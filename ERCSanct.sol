// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Sanctions is ERC20, Ownable {
    mapping(address => bool) private _sanctioned;
    constructor ERC20("SanctionedToken", "SCT"){
        _mint(msg.sender,10000 * 10 **18);
    }
    function addToSanctions (address user) external onlyOwner {
        _sanctioned[user] = true;
    }
    function RmFromSanctions (address user) external onlyOwner {
        _sanctioned[user] = false;
    }
    function BeforeTransaction ( address from, address to , uint256 amount ) external onlyOwner {
        require(!_sanctioned[from], "sender is sanctioned");
        require(!_sanctioned[to],"receiver is sanctioned");
    }
}