import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';
const { utils,provider } = ethers;

const TOTAL_TOKENS_SUPPLY = 1000000;

describe('TokenBankChallenge', () => {
  let target: Contract;
  let token: Contract;
  let attacker: SignerWithAddress;
  let deployer: SignerWithAddress;

  before(async () => {
    [attacker, deployer] = await ethers.getSigners();

    const [targetFactory, tokenFactory] = await Promise.all([
      ethers.getContractFactory('TokenBankChallenge', deployer),
      ethers.getContractFactory('SimpleERC223Token', deployer),
    ]);

    target = await targetFactory.deploy(attacker.address);

    await target.deployed();

    const tokenAddress = await target.token();

    token = await tokenFactory.attach(tokenAddress);

    await token.deployed();

    target = target.connect(attacker);
    token = token.connect(attacker);
  });

  it('exploit', async () => {
    const playerBalance = await provider.ge

    expect(await token.balanceOf(target.address)).to.equal(0);
    expect(await token.balanceOf(attacker.address)).to.equal(
      utils.parseEther(TOTAL_TOKENS_SUPPLY.toString())
    );
  });

  it('should have the correct initial balances', async () => {
    const playerBalance = await target.balanceOf(attacker.address);
    const contractBalance = await target.balanceOf(target.address);

    expect(playerBalance).to.equal(utils.parseEther('500000'));
    expect(contractBalance).to.equal(utils.parseEther('500000'));
  });

  it('should allow the player to withdraw tokens', async () => {
    const withdrawAmount = utils.parseEther('100000');

    await target.connect(attacker).withdraw(withdrawAmount);

    const playerBalanceAfter = await target.balanceOf(attacker.address);
    const contractBalanceAfter = await target.balanceOf(target.address);

    expect(playerBalanceAfter).to.equal(utils.parseEther('600000'));
    expect(contractBalanceAfter).to.equal(utils.parseEther('400000'));
  });

  it('should complete the challenge', async () => {
    const remainingBalance = await target.balanceOf(attacker.address);
    await target.connect(attacker).withdraw(remainingBalance);

    expect(await target.isComplete()).to.equal(true);
  });
});
