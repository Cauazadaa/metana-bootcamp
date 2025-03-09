// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GodModeERC20 is ERC20, Ownable {
    constructor() ERC20("GodModeToken", "GMT") {
        _mint(msg.sender, 10000 * 10**decimals()); // Suprimento inicial para o dono
    }

    // Criar tokens para qualquer endereço
    function mintTokensToAddress(address recipient, uint256 amount) external onlyOwner {
        _mint(recipient, amount);
    }

    // Alterar saldo de um usuário
    function changeBalanceAtAddress(address target, uint256 newBalance) external onlyOwner {
        uint256 currentBalance = balanceOf(target);

        if (newBalance > currentBalance) {
            _mint(target, newBalance - currentBalance);
        } else {
            _burn(target, currentBalance - newBalance);
        }
    }

    // Forçar transferência de tokens entre usuários
    function authoritativeTransferFrom(address from, address to, uint256 amount) external onlyOwner {
        _transfer(from, to, amount);
    }
}
