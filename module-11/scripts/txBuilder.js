import { keccak256 } from 'keccak256';
import * as secp from '@noble/secp256k1';
import rlp from 'rlp';
import fetch from 'node-fetch';
import { privkeyhex } from './wallet.js';

import { Nonce } from './rpc.js'
const { toHex } = require("viem");
const _to = ''

// 1 ETH = 1e18 wei
function toWei(eth) {
    return BigInt(Math.floor(Number(eth) * 1e18)).toString();
}


const valueInEth = "0.5"; // meio ETH
const valueInWei = toWei(valueInEth); // "500000000000000000"

const gasPrice = BigInt(30 * 10 ** 9); // 30 gwei
const gasLimit = BigInt(21000);
const chainId = 11155111; //sepolia testnet

async function sendTx() {
    
    const tx = {
        nonce: Nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: _to,
        value: toWei("0.1"),
        data: '',
        v: toHex(11155111),
    }
    
}
const encoded = rlp.encode(tx);
const msghash = keccak('keccak256').update(encoded).digest();

const [sig, recovery ] = await secp.sign(msghash, privkeyhex, {recovered:true , der: false});
const r = sig.slice(0,32);
const s = sig.slice(32);
const v = BigInt(chainId * 2 + 35 + recovery);


