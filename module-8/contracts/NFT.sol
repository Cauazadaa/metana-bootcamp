// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;


import "./merkle.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NTL is ERC721Enumerable, Ownable {
    enum SaleState { CLOSED , PRESALE , PUBLIC_SALE , SOLD_OUT}
    SaleState public state;


    MerkleTree public merkleContract;
    uint256 public maxSupply = 10000;
    mapping(address => bool) hasMinted;
    mapping(address => bool) commitments;
    mapping(address => uint256) commitBlock;
    constructor(address _MerkleContract) ERC721("Meteno","MTL"){
        merkleContract = MerkleTree(_MerkleContract);
    
    }

    modifier onlyState (SaleState _state){
        require(state == _state,"wrong state");
    } 
    function startPresale() external onlyOwner {    
        state = SaleState.PRESALE;
    
    function closeSale() external onlyOwner {
        state = Salestate.CLOSED;
    }
   

    function commit(bytes32 _commit) external onlyState(SaleState.PRESALE) {
        require(commitments[msg.sender] == bytes32(0),"already commited");
        commitments[msg.sender] = _commit;
        commitBlock[msg.sender] = block.number;

    }

    function reveal(uint256 secret,bytes32 calldata proof, uint256 index) external onlyState(SaleState.PRESALE){
        require(commitments[msg.sender] > 0,"did not commited ");
        require(block.number >= commitBlock[msg.sender] + 10 ,"wait 10 blocks");
        bytes32 expectedCommit = keccak256(abi.encode(secret));
        require(expectedCommit == commitments[msg.sender],"invalid reveal");

        bytes32 leaf = keccak256(abi.encodePacked(index,msg.sender));
        require(merkleContract._verify(proof,leaf),"not on the merkle tree");

        uint256 randId = keccak256(abi.encode(secret,blockhash(commitBlock[msg.sender] + 1))) % maxSupply;
        require(!hasMinted[msg.sender],"already minted");
        _mint(msg.sender, randId);
        hasMinted[msg.sender] = true;
        commitments[msg.sender] = bytes32(0);


    }

    function munticall(bytes32[] calldata data, ) external {
        for(uint256 i = 0 ; i < data.length, i++){
            (bool success) = address(this).delegatecall(data[i]);
            require(success,"call failed");
        }
    }
}
