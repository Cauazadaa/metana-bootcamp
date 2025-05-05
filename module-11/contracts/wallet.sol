contract Wallet { 
    event Deposit(address indexed sender, uint amount );
    event Submit(uint txId);
    event Approve(address indexed owner,uint indexed txId);
    event Revoke(address indexed owner ,uint indexed txId);
    event Execute(uint indexed txId);
    event Received(address sender , uint amount);
address[] public owners;
mapping(address => bool)public isOwner;
mapping(address => uint)public nonces;
uint public required;
uint public balance;



    struct Transaction{
        address to;
        uint value;
        bytes data;
        bool executed;
    }
    Transaction[] public transactions;
    constructor(address[] memory _owners,uint _required){
        require(_required > 0 ,"owners required");
        require(_required <= _owners.length,"invalid requirement");
        for(uint i; i< _owners.length; i++){
            address owner = _owners[i];
            require(owner != address(0),"invalid owner address");
            isOwner[owner] = true;
            owners.push(owner);
        }

        required = _required;
    }
    function Receive(address sender, uint amount) external payable {
        require(IERC20(token).transferFrom(msg.sender, address(this),amount),"transfer failed");
        require(msg.sender == tx.origin, "not an EOA");

        emit Received(msg.sender,msg.value);
    }
    
    



}   
