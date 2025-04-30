const address = '0xa6C2d81B170ff79F78a67E2457320d844acfcB1a';
const nonce = async(address) => {
    const res = await fetch(
        "https://eth-sepolia.g.alchemy.com/v2/Uz69O0Sm7fxGF7Pbeh6FA3abrMTpNZBk",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getTransactionCount",
      params: [address, "latest"],
      id: 1

        
        }),
});
const json = await res.json();
return parseInt(json.result, 16);
};