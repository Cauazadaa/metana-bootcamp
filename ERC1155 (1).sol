// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract ERC115 is ERC1155 , Ownable{
    uint256 public constant TOKEN_0 =0;
    uint256 public constant TOKEN_1 = 1;
    uint256 public constant TOKEN_2=2;
    uint256 public constant TOKEN_3 =3;
    uint256 public constant TOKEN_4 =4 ;
    uint256 public constant TOKEN_5=5;
    uint256 public constant TOKEN_6 = 6;
    mapping(address => uint256) public mintmin;
    mapping(address =>mapping(uint256 => uint256)) public balances;

    constructor() ERC1155("https://example.com") Ownable(msg.sender) {}


    function getaBalance(address owner,uint256 tokenId) external view returns(uint256){
       return  balanceOf(owner , tokenId);
    }

    
    function canMint(address user) public view returns (bool) {
        return block.timestamp >= mintmin[user] + 1 minutes; 
    }


    function mint012(uint256 tokenId) public  {
        require(tokenId <= 2 ,"invalid token id");
        require(canMint(msg.sender), "too early to mint again");
        _mint(msg.sender , tokenId , 1,"");

        

    }
    event TokenForged(address indexed user,uint256 tokenId);
    function forging3() public returns (bool) {
        require(balanceOf(msg.sender , TOKEN_0)>=1,"must have token0" );
        require(balanceOf(msg.sender, TOKEN_1) >=1,"must have token1");
         _burn(msg.sender,TOKEN_0 , 1);
         _burn(msg.sender,TOKEN_1 , 1);
         _mint(msg.sender , TOKEN_3,1,"");

         emit TokenForged(msg.sender, TOKEN_3);
         return true;


    }

         function forging4() public returns (bool) {
        require(balanceOf(msg.sender , TOKEN_1)>=1,"must have token1" );
        require(balanceOf(msg.sender, TOKEN_2) >=1,"must have token2");
         _burn(msg.sender,TOKEN_1 , 1);
         _burn(msg.sender,TOKEN_2 , 1);
         _mint(msg.sender , TOKEN_3,1,"");

         emit TokenForged(msg.sender, TOKEN_4);
         return true;
}



 function forging5() public returns (bool) {
        require(balanceOf(msg.sender , TOKEN_0)>=1,"must have token0" );
        require(balanceOf(msg.sender, TOKEN_2) >=1,"must have token2");
         _burn(msg.sender,TOKEN_0 , 1);
         _burn(msg.sender,TOKEN_2 , 1);
         _mint(msg.sender , TOKEN_5,1,"");

         emit TokenForged(msg.sender, TOKEN_5);
         return true;

 }

  function forging6() public returns (bool) {
        require(balanceOf(msg.sender , TOKEN_0)>=1,"must have token0" );
        require(balanceOf(msg.sender, TOKEN_1) >=1,"must have token1");  
        require(balanceOf(msg.sender, TOKEN_2) >=1,"must have token2");

         _burn(msg.sender,TOKEN_0 , 1);
         _burn(msg.sender,TOKEN_1 , 1);
        _burn(msg.sender,TOKEN_2, 1);

         _mint(msg.sender , TOKEN_6,1,"");

         emit TokenForged(msg.sender, TOKEN_6);
         return true;
  }


  function tradeToken(uint256 tokenId, uint256 amount) public returns (bool) {
    require(tokenId <= 2, "Invalid token ID");
    require(balanceOf(msg.sender, tokenId) >= amount, "Not enough tokens");

    _burn(msg.sender, tokenId, amount); // Queima os tokens do usuário

    _mint(msg.sender, tokenId, amount, ""); // Cria os tokens de volta para o usuário

    // Emite o evento para o trade
    emit TokenForged(msg.sender, tokenId); // Você pode emitir o evento aqui para informar que a troca foi realizada

    return true;
}

}