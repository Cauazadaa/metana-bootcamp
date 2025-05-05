import pkg from 'elliptic';
const { ec } = pkg;
import crypto from 'crypto';
import { keccak256 } from 'viem';

// Initialize the curve
const ecInstance = new ec('secp256k1');

const privateKey = crypto.randomBytes(32);
const privkeyhex = privateKey.toString('hex');
const keyPair = ecInstance.keyFromPrivate(privkeyhex);
const pub = keyPair.getPublic().encode('hex').slice(2);

export const ethAddress = '0x' + keccak256(`0x${pub}`).slice(-40);
export { privkeyhex };

console.log("eth address : ", ethAddress);
console.log("priv key : ", privkeyhex);
console.log("pubkey = : ", pub);
