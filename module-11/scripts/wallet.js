var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
const crypto = require('crypto');
const { keccak256 } = require('viem');




const privateKey = crypto.randomBytes(32);
const privkeyhex = privateKey.toString('hex');
const keyPair = ec.keyFromPrivate(privkeyhex);
const pub = keyPair.getPublic().encode('hex').slice(2);

´
const ethAddress = '0x' + keccak256(`0x${pub}`).slice(-40);
console.log("eth address : ",ethAddress);
console.log("priv key : ",privkeyhex);
console.log("pubkey = : ",pub);