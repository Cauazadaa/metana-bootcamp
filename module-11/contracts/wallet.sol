contract Wallet { 
    event Deposit(address indexed sender, uint amount );
    event Submit(uint txId);
    event Approve(address indexed owner,uint indexed txId);
    event Revoke(address indexed owner ,uint indexed txId);
    event Execute(uint indexed txId);
address[] public owners;
mapping(address => bool)public isOwner;
mapping(address => uint)public nonces;
uint public required;



    struct Transaction{
        address to;
        uint value;
        bytes data;
        bool executed;
    }
    Transaction[] public tansactions;
    constructor(address[] memory _owners,uint _required){
        require(_required > 0 ,"owners required");
        require(_required <= _owners.length,"invalid requirement");
        for(uint i; i< _owners.length; i++){
            address owner = _owners[i];
            require(owner != address(0),"invalid owner address");
            isOwner[owner] = true;
            owners.push(owner);
        }

        _required = required;
    }
    function getNonce(address owner) public view returns (uint){
        return nonces[owner];
    }
    function incrementNonce(address owner) internal{
        
    }



}   
