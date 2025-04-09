// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/Address.sol"

contract Hack  {
    using Address for address

    address public creator;
    bool public isContract;
    constructor() {
        creator = msg.sender;
        isContract = address(msg.sender).isContract();
    }
}

contract attacker {
   bool public success;

    constructor(Hack target){
        success = !target.isContract();
    }

    
}

contract txOrigin {
    address public origin; 


    constrcutor() {
        require(msg.sender == tx.origin);
        origin = msg.sender;
    }
}