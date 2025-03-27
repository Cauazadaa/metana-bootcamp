import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'ethers';

describe('DeployAContract', () => {
  let deployer: SignerWithAddress;
  let attacker: SignerWithAddress;
  let target: Contract;

  before(async () => {
    [attacker, deployer] = await ethers.getSigners();
  });

  it('exploit', async () => {
    /**
     * YOUR CODE HERE
     * */

    expect(await target.isComplete()).to.equal(true);
  });
});
