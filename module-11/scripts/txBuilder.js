import keccak256 from 'keccak256';
import * as secp from '@noble/secp256k1';
import rlp from 'rlp';
import fetch from 'node-fetch';
import { privkeyhex } from './wallet.js';
import { ethAddress } from './wallet.js';
import { Nonce } from './rpc.js';
import { toHex } from 'viem';
// 1 ETH = 1e18 wei
function toWei(eth) {
    return BigInt(Math.floor(Number(eth) * 1e18)).toString();
}



async function sendTx() {
    const _to = '0xa6C2d81B170ff79F78a67E2457320d844acfcB1a';
    const nonce = await Nonce(ethAddress);
    const gasPrice = BigInt(30 * 10 ** 9); // 30 gwei
    const gasLimit = await estimateGas(_to, toWei("0.1"), '0x');
    const chainId = 11155111; //sepolia testnet
    
    const tx = {
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: _to,
        value: toWei("0.1"),
        data: '0x',
        chainId: toHex(11155111),
    }
    
    // Helper function to convert BigInt to hex string
    function bigIntToHex(value) {
        if (typeof value === 'bigint') {
            return '0x' + value.toString(16);
        }
        return value;
    }
    
    // Create properly formatted array for signing
    const txForSigning = [
        bigIntToHex(tx.nonce),
        bigIntToHex(tx.gasPrice),
        bigIntToHex(tx.gasLimit),
        tx.to,
        bigIntToHex(tx.value),
        tx.data || '0x',
        tx.chainId,
        '0x',
        '0x'
    ];
    
const encoded = rlp.encode(txForSigning);
// Convert the encoded result to a Buffer before hashing
const encodedBuffer = Buffer.from(encoded);
const msghash = keccak256(encodedBuffer);
const privateKeyBuffer = Buffer.from(privkeyhex, 'hex');
const [sig, recovery ] = await secp.signAsync(msghash, privateKeyBuffer, {recovered:true , der: false});
const r = sig.slice(0,32);
const s = sig.slice(32);
const v = BigInt(chainId * 2 + 35 + recovery);

const signedTx = [
    bigIntToHex(tx.nonce),
    bigIntToHex(tx.gasPrice),
    bigIntToHex(tx.gasLimit),
    tx.to,
    bigIntToHex(tx.value),
    tx.data || '0x',
    bigIntToHex(v),
    '0x' + Buffer.from(r).toString('hex'),
    '0x' + Buffer.from(s).toString('hex'),
];

const rawtx = rlp.encode(signedTx);
const rawHex = '0x' + Buffer.from(rawtx).toString('hex');

const res = await fetch('https://eth-sepolia.g.alchemy.com/v2/Uz69O0Sm7fxGF7Pbeh6FA3abrMTpNZBk', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_sendRawTransaction",
      params: [rawHex],
      id: 1,

    }),
});
const json = await res.json();
console.log("transaction response : ", json);
if(json.result) {
    console.log("transaction hash : ", json.result);
}
else {
    console.error("transaction failed : ", json.error.message);
}

}
async function estimateGas(to, value, data) {
    if(!data || data === '0x') {
        data = '0x';
    }
    const myWallet = ethAddress;
    const res = await fetch('https://eth-sepolia.g.alchemy.com/v2/Uz69O0Sm7fxGF7Pbeh6FA3abrMTpNZBk', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_estimateGas",
            params: [
                {  
                    from: myWallet,
                    to: to,
                    value: value,
                    data: data
                },
                "latest"
            ],
            id: 1
        }),
    });
    const json = await res.json();
    console.log("gas estimate : ", json.result);
    return BigInt(parseInt(json.result || '0x5208',16));
}
sendTx().catch(error => {
    console.error(error);
});

