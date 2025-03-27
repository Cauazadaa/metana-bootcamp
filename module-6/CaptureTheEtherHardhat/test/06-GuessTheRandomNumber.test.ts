import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract, providers } from 'ethers';
import { ethers, network } from 'hardhat';
const { utils, provider } = ethers;
import { keccak256 } from 'ethers/lib/utils';

describe('GuessTheRandomNumberChallenge', () => {
  let target: Contract;
  let attacker: SignerWithAddress;
  let deployer: SignerWithAddress;

  before(async () => {
    [attacker, deployer] = await ethers.getSigners();

    target = await (
      await ethers.getContractFactory('GuessTheRandomNumberChallenge', deployer)
    ).deploy({
      value: utils.parseEther('1'),
    });

    await target.deployed();

    target = target.connect(attacker);
  });

  it('exploit', async () => {
    
    const blockNumber = await provider.getBlockNumber() -1;
    const blockHash = await provider.getBlock(blockNumber);
    const timestamp = Math.floor(Date.now() / 1000);
    const answer = keccak256(blockHash + timestamp.toString());
    const tx = await target.guess(answer, {value : utils.parseEther('1')});
    tx.wait();

    expect(await target.isComplete()).to.equal(true);
  });
});
